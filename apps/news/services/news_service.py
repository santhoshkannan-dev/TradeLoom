from decimal import Decimal
from django.utils import timezone
from apps.portfolio.models import Holding
from apps.news.models.news_article import NewsArticle
from apps.news.models.news_sentiment import NewsSentiment
from apps.news.providers.yahoo import YahooNewsProvider
from apps.news.sentiment.service import SentimentService


class NewsService:
    _provider = YahooNewsProvider()

    @classmethod
    def set_provider(cls, provider):
        cls._provider = provider

    @staticmethod
    def sync_news(symbols=None):
        """
        Synchronizes company and market news.
        - Fetches news from provider.
        - Saves articles.
        - Analyzes sentiments.
        - Maps to symbols/companies.
        """
        if symbols is None:
            symbols = list(
                Holding.objects.values_list("symbol", flat=True).distinct()
            )

        synced_articles_count = 0

        # Sync general market news
        market_articles = NewsService._provider.fetch_market_news()
        NewsService._process_articles(market_articles, "MARKET")

        # Sync symbol specific news
        for symbol in symbols:
            company_articles = NewsService._provider.fetch_company_news(symbol)
            count = NewsService._process_articles(company_articles, symbol)
            synced_articles_count += count

        return synced_articles_count

    @staticmethod
    def _process_articles(articles, symbol):
        count = 0
        company_keywords = {
            "INFY": ["INFY", "INFOSYS"],
            "TCS": ["TCS", "TATA CONSULTANCY", "TATA CONSULTANCY SERVICES"],
            "RELIANCE": ["RELIANCE"],
        }

        for art in articles:
            article, created = NewsArticle.objects.get_or_create(
                url=art["url"],
                defaults={
                    "title": art["title"],
                    "summary": art["summary"],
                    "source": art["source"],
                    "published_at": art["published_at"],
                },
            )

            # Detect all applicable symbols
            target_symbols = set()
            if symbol != "MARKET":
                target_symbols.add(symbol.upper().strip())

            # Text scan for company mapping
            text_to_scan = (art["title"] + " " + art["summary"]).upper()
            for sym, kw_list in company_keywords.items():
                if any(kw in text_to_scan for kw in kw_list):
                    target_symbols.add(sym)

            # Analyze sentiment and save NewsSentiment for each mapped symbol
            for sym in target_symbols:
                sentiment_results = SentimentService.analyze_text(
                    art["title"] + " " + art["summary"]
                )

                NewsSentiment.objects.update_or_create(
                    article=article,
                    symbol=sym,
                    defaults={
                        "sentiment": sentiment_results["sentiment"],
                        "confidence": Decimal(
                            str(sentiment_results["confidence"])
                        ),
                        "reason": sentiment_results["reason"],
                        "model_version": sentiment_results["model_version"],
                    },
                )
            if created:
                count += 1
        return count

    @staticmethod
    def get_company_news(symbol):
        return NewsSentiment.objects.filter(
            symbol=symbol.upper().strip()
        ).select_related("article")

    @staticmethod
    def get_portfolio_news(portfolio):
        symbols = Holding.objects.filter(
            portfolio=portfolio, quantity__gt=0
        ).values_list("symbol", flat=True)
        return NewsSentiment.objects.filter(symbol__in=symbols).select_related(
            "article"
        )
