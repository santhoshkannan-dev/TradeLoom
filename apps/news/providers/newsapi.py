from .base import NewsProvider


class NewsAPIProvider(NewsProvider):
    def fetch_company_news(self, symbol):
        return []

    def fetch_market_news(self):
        return []
