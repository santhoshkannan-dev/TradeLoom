from decimal import Decimal
from unittest.mock import patch, MagicMock
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.market.models.quote import MarketQuote
from apps.market.services.market_service import MarketService
from apps.users.tests.factories import UserFactory

pytestmark = pytest.mark.django_db


class TestMarketAPI:
    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    @patch("yfinance.Ticker")
    def test_get_quote_service_and_cache(self, mock_ticker_class):
        # Setup mock ticker info
        mock_ticker = MagicMock()
        mock_ticker.info = {
            "currentPrice": 150.00,
            "regularMarketPreviousClose": 148.50,
            "volume": 1000000,
            "marketCap": 2000000000,
        }
        mock_ticker_class.return_value = mock_ticker

        # Call get_quote
        quote = MarketService.get_quote("AAPL", force_fetch=True)
        assert quote.symbol == "AAPL"
        assert float(quote.current_price) == 150.00
        assert float(quote.previous_close) == 148.50
        assert float(quote.change) == 1.50
        assert float(quote.change_percent) == pytest.approx(1.0101, abs=1e-4)

        # Check database quote exists
        db_quote = MarketQuote.objects.get(symbol="AAPL")
        assert db_quote.current_price == quote.current_price

        # Call again without force_fetch, should return cached
        mock_ticker_class.reset_mock()
        quote_cached = MarketService.get_quote("AAPL")
        assert quote_cached.id == quote.id
        mock_ticker_class.assert_not_called()

    @patch("yfinance.Ticker")
    def test_quote_endpoint(self, mock_ticker_class, auth_client_a):
        mock_ticker = MagicMock()
        mock_ticker.info = {
            "currentPrice": 150.00,
            "regularMarketPreviousClose": 148.50,
            "volume": 1000000,
            "marketCap": 2000000000,
        }
        mock_ticker_class.return_value = mock_ticker

        url = reverse("api:market:quote", kwargs={"symbol": "AAPL"})
        response = auth_client_a.get(url)
        assert response.status_code == status.HTTP_200_OK
        data = response.data
        assert data["symbol"] == "AAPL"
        assert float(data["current_price"]) == 150.00

    @patch("yfinance.Ticker")
    def test_history_endpoint(self, mock_ticker_class, auth_client_a):
        import pandas as pd

        mock_ticker = MagicMock()

        # Mock DataFrame for history
        df = pd.DataFrame(
            {
                "Open": [140.0, 142.0],
                "High": [145.0, 146.0],
                "Low": [139.0, 141.0],
                "Close": [141.0, 143.0],
                "Volume": [1000, 1100],
            },
            index=pd.to_datetime(["2026-08-01", "2026-08-02"]),
        )
        mock_ticker.history.return_value = df
        mock_ticker_class.return_value = mock_ticker

        url = reverse("api:market:history", kwargs={"symbol": "AAPL"})
        response = auth_client_a.get(url)
        assert response.status_code == status.HTTP_200_OK
        data = response.data
        assert len(data) == 2
        assert data[0]["close"] == 141.0
        assert data[1]["close"] == 143.0

    @patch("yfinance.Search")
    def test_search_endpoint(self, mock_search_class, auth_client_a):
        mock_search = MagicMock()
        mock_search.quotes = [
            {
                "symbol": "AAPL",
                "shortname": "Apple Inc.",
                "exchDisp": "NASDAQ",
                "typeDisp": "Equity",
            }
        ]
        mock_search_class.return_value = mock_search

        url = reverse("api:market:search") + "?q=apple"
        response = auth_client_a.get(url)
        assert response.status_code == status.HTTP_200_OK
        data = response.data
        assert len(data) == 1
        assert data[0]["symbol"] == "AAPL"
        assert data[0]["name"] == "Apple Inc."
