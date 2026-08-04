from decimal import Decimal
import yfinance as yf
from .base import MarketDataProvider


class YahooFinanceProvider(MarketDataProvider):
    def get_quote_data(self, symbol):
        """
        Fetches live quote data from Yahoo Finance.
        """
        symbol = symbol.upper().strip()
        ticker = yf.Ticker(symbol)
        info = ticker.info
        current_price = info.get("currentPrice") or info.get("regularMarketPrice")
        previous_close = info.get("regularMarketPreviousClose") or info.get(
            "previousClose"
        )
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
                volume = (
                    int(hist["Volume"].iloc[-1]) if "Volume" in hist.columns else 0
                )

        if not current_price:
            raise ValueError(f"Could not retrieve pricing data for symbol {symbol}")

        return {
            "current_price": Decimal(str(current_price)),
            "previous_close": Decimal(str(previous_close)),
            "volume": int(volume),
            "market_cap": int(market_cap) if market_cap else None,
        }

    def get_company_info(self, symbol):
        """
        Fetches basic company description/sector info from Yahoo Finance.
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

    def get_historical_prices(self, symbol, period="1mo"):
        """
        Fetches historical price list from Yahoo Finance.
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

    def search_symbols(self, query):
        """
        Searches for symbol tickers matching query on Yahoo Finance.
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
