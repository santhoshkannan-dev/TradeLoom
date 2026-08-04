from datetime import datetime
import yfinance as yf
from django.utils import timezone
from .base import NewsProvider


class YahooNewsProvider(NewsProvider):
    def fetch_company_news(self, symbol):
        symbol = symbol.upper().strip()
        try:
            ticker = yf.Ticker(symbol)
            news_items = ticker.news or []
            return self._normalize_news(news_items)
        except Exception:
            return []

    def fetch_market_news(self):
        try:
            ticker = yf.Ticker("^NSEI")
            news_items = ticker.news or []
            return self._normalize_news(news_items)
        except Exception:
            return []

    def _normalize_news(self, news_items):
        articles = []
        for item in news_items:
            pub_time = item.get("providerPublishTime")
            if pub_time:
                try:
                    published_at = datetime.fromtimestamp(
                        pub_time, tz=timezone.get_current_timezone()
                    )
                except Exception:
                    published_at = timezone.now()
            else:
                published_at = timezone.now()

            articles.append(
                {
                    "title": item.get("title", ""),
                    "summary": item.get("summary", "") or item.get("title", ""),
                    "url": item.get("link", ""),
                    "published_at": published_at,
                    "source": item.get("publisher", "Yahoo Finance"),
                }
            )
        return articles
