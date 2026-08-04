from decimal import Decimal
from django.utils import timezone
from apps.market.models.quote import MarketQuote
from apps.market.providers.yahoo import YahooFinanceProvider


class MarketService:
    _provider = YahooFinanceProvider()

    @classmethod
    def set_provider(cls, provider):
        """
        Allows dynamically injecting a custom provider for testing or switching.
        """
        cls._provider = provider

    @staticmethod
    def get_quote(symbol, force_fetch=False):
        """
        Retrieves a quote from the database cache. If stale or missing, fetches
        live from provider and updates the database cache.
        """
        symbol = symbol.upper().strip()
        quote = MarketQuote.objects.filter(symbol=symbol).first()

        # Check if cache is fresh (less than 5 minutes old)
        if quote and not force_fetch:
            time_diff = timezone.now() - quote.updated_at
            if time_diff.total_seconds() < 300:
                return quote

        # Fetch from Provider
        try:
            data = MarketService._provider.get_quote_data(symbol)
            current_price = data["current_price"]
            previous_close = data["previous_close"]
            volume = data["volume"]
            market_cap = data.get("market_cap")
        except Exception:
            # Fallback to database cache if fetch fails (e.g. network issues)
            if quote:
                return quote
            current_price = Decimal("0.0000")
            previous_close = Decimal("0.0000")
            volume = 0
            market_cap = 0

        change = current_price - previous_close
        change_percent = Decimal("0.0000")
        if previous_close > 0:
            change_percent = (change / previous_close) * Decimal("100.00")

        quote, created = MarketQuote.objects.update_or_create(
            symbol=symbol,
            defaults={
                "current_price": current_price,
                "previous_close": previous_close,
                "change": change,
                "change_percent": change_percent,
                "volume": volume,
                "market_cap": market_cap,
                "updated_at": timezone.now(),
            },
        )
        return quote

    @staticmethod
    def get_multiple_quotes(symbols):
        quotes = {}
        for sym in symbols:
            try:
                quotes[sym] = MarketService.get_quote(sym)
            except Exception:
                pass
        return quotes

    @staticmethod
    def get_company_info(symbol):
        return MarketService._provider.get_company_info(symbol)

    @staticmethod
    def get_historical_prices(symbol, period="1mo"):
        return MarketService._provider.get_historical_prices(symbol, period=period)

    @staticmethod
    def search_symbols(query):
        return MarketService._provider.search_symbols(query)
