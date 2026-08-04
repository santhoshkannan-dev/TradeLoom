from abc import ABC, abstractmethod


class BrokerAdapter(ABC):
    @abstractmethod
    def fetch_holdings(self):
        """Return standardized holdings"""
        pass

    @abstractmethod
    def fetch_transactions(self):
        """Return standardized transactions"""
        pass

    @abstractmethod
    def fetch_profile(self):
        """Return broker account details"""
        pass
