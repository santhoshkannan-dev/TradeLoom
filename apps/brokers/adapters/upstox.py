from .base import BrokerAdapter


class UpstoxAdapter(BrokerAdapter):
    def fetch_holdings(self):
        return []

    def fetch_transactions(self):
        return []

    def fetch_profile(self):
        return {"broker": "Upstox"}
