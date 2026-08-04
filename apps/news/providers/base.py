from abc import ABC, abstractmethod


class NewsProvider(ABC):
    @abstractmethod
    def fetch_company_news(self, symbol):
        """
        Fetches news articles related to a specific company symbol.
        """
        pass

    @abstractmethod
    def fetch_market_news(self):
        """
        Fetches general market news articles.
        """
        pass
