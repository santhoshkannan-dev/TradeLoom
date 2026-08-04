from decimal import Decimal
import yfinance as yf
from django.utils import timezone
from apps.market.models.quote import MarketQuote


class MarketService:
    @staticmethod
    def get_quote(symbol, force_fetch=False):
        """
        Retrieves a quote from the database cache. If stale or missing, fetches
        live from yfinance and updates the database cache.
        """
        symbol = symbol.upper().strip()
        quote = MarketQuote.objects.filter(symbol=symbol).first()

        # Check if cache is fresh (less than 5 minutes old)
        if quote and not force_fetch:
            time_diff = timezone.now() - quote.updated_at
            if time_diff.total_seconds() < 300:
                return quote

        # Fetch from Yahoo Finance
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            current_price = info.get("currentPrice") or info.get("regularMarketPrice")
            previous_close = info.get("regularMarketPreviousClose") or info.get("previousClose")
            volume = info.get("volume") or info.get("regularMarketVolume") or 0
            market_cap = info.get("marketCap")

            # Fallback to fast_info or history if info is empty
            if not current_price:
                fast_info = ticker.fast_info
                current_price = fast_info.last_price
                previous_close = fast_info.previous_close
                volume = fast_info.volume or 0
                market_cap = fast_info.market_cap

            if not current_price:
                hist = ticker.history(period="1d")
                if not hist.empty:
                    current_price = hist["Close"].iloc[-1]
                    previous_close = hist["Open"].iloc[-1]
                    volume = int(hist["Volume"].iloc[-1]) if "Volume" in hist.columns else 0

            # Last resort fallback if still empty
            if not current_price:
                current_price = 0.0
                previous_close = 0.0
                volume = 0
                market_cap = 0

        except Exception:
            # Fallback to database cache if fetch fails (e.g., network issues)
            if quote:
                return quote
            current_price = 0.0
            previous_close = 0.0
            volume = 0
            market_cap = 0

        current_price = Decimal(str(current_price))
        previous_close = Decimal(str(previous_close))
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
        """
        Retrieves quotes for multiple symbols.
        """
        quotes = {}
        for sym in symbols:
            try:
                quotes[sym] = MarketService.get_quote(sym)
            except Exception:
                pass
        return quotes

    @staticmethod
    def get_company_info(symbol):
        """
        Retrieves general company metadata from yfinance.
        """
        symbol = symbol.upper().strip()
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            return {
                "symbol": symbol,
                "name": info.get("longName") or info.get("shortName") or symbol,
                "sector": info.get("sector") or "Unknown",
                "industry": info.get("industry") or "Unknown",
                "summary": info.get("longBusinessSummary") or "",
            }
        except Exception:
            return {
                "symbol": symbol,
                "name": symbol,
                "sector": "Unknown",
                "industry": "Unknown",
                "summary": "",
            }

    @staticmethod
    def get_historical_prices(symbol, period="1mo"):
        """
        Retrieves historical prices for a symbol.
        """
        symbol = symbol.upper().strip()
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period=period)
            prices = []
            for index, row in hist.iterrows():
                prices.append(
                    {
                        "date": index.strftime("%Y-%m-%d"),
                        "open": round(float(row["Open"]), 2),
                        "high": round(float(row["High"]), 2),
                        "low": round(float(row["Low"]), 2),
                        "close": round(float(row["Close"]), 2),
                        "volume": int(row["Volume"]),
                    }
                )
            return prices
        except Exception:
            return []

    @staticmethod
    def search_symbols(query):
        """
        Searches Yahoo Finance for matching symbols/companies.
        """
        try:
            search = yf.Search(query, max_results=10)
            results = []
            for quote in search.quotes:
                results.append(
                    {
                        "symbol": quote.get("symbol"),
                        "name": quote.get("shortname")
                        or quote.get("longname")
                        or quote.get("symbol"),
                        "exchange": quote.get("exchDisp") or quote.get("exchange"),
                        "type": quote.get("typeDisp") or quote.get("quoteType"),
                    }
                )
            return results
        except Exception:
            return []
