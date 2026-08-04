from abc import ABC, abstractmethod


class MarketDataProvider(ABC):
    @abstractmethod
    def get_quote_data(self, symbol):
        """
        Fetches live quote data from the provider.
        Returns a dict with keys: current_price, previous_close, volume, market_cap.
        """
        pass

    @abstractmethod
    def get_company_info(self, symbol):
        """
        Fetches basic company description/sector info.
        Returns a dict.
        """
        pass

    @abstractmethod
    def get_historical_prices(self, symbol, period="1mo"):
        """
        Fetches historical price list.
        Returns a list of dicts.
        """
        pass

    @abstractmethod
    def search_symbols(self, query):
        """
        Searches for symbol tickers matching query.
        Returns a list of dicts.
        """
        pass
