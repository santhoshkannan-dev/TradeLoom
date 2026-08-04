import pytest
from decimal import Decimal
from unittest.mock import patch, MagicMock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.users.tests.factories import UserFactory
from apps.portfolio.models import Portfolio, Holding
from apps.analytics.models.analytics_report import AnalyticsReport
from apps.analytics.calculators.returns import ReturnsCalculator
from apps.analytics.calculators.allocation import AllocationCalculator
from apps.analytics.calculators.diversification import DiversificationCalculator
from apps.analytics.calculators.risk import RiskCalculator
from apps.analytics.calculators.performance import PerformanceCalculator
from apps.analytics.services.analytics_service import AnalyticsService

pytestmark = pytest.mark.django_db


class TestAnalyticsEngine:
    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    def test_returns_calculator(self):
        holdings = [
            {"quantity": 10, "average_price": 1500.0, "current_price": 1600.0},
            {"quantity": 5, "average_price": 3000.0, "current_price": 2800.0},
        ]
        res = ReturnsCalculator.calculate(holdings)
        assert res["total_investment"] == 30000.00
        assert res["current_value"] == 30000.00
        assert res["total_profit"] == 0.00
        assert res["total_return_percentage"] == 0.00

    def test_allocation_calculator(self):
        holdings = [
            {
                "symbol": "INFY",
                "asset_type": "STOCK",
                "sector": "IT",
                "broker": "ZERODHA",
                "quantity": 10,
                "current_price": 1500.0,
                "market_cap": 2e10,
            },
            {
                "symbol": "TCS",
                "asset_type": "STOCK",
                "sector": "IT",
                "broker": "ZERODHA",
                "quantity": 5,
                "current_price": 3000.0,
                "market_cap": 5e9,
            },
        ]
        res = AllocationCalculator.calculate(holdings)
        assert res["asset_allocation"] == {"STOCK": 100.0}
        assert res["sector_allocation"] == {"IT": 100.0}
        assert res["broker_allocation"] == {"ZERODHA": 100.0}
        assert res["market_cap_allocation"] == {
            "Large Cap": 50.0,
            "Mid Cap": 50.0,
        }

    def test_diversification_calculator(self):
        holdings = [
            {
                "symbol": "INFY",
                "quantity": 10,
                "current_price": 100.0,
                "sector": "IT",
            },
            {
                "symbol": "TCS",
                "quantity": 10,
                "current_price": 100.0,
                "sector": "IT",
            },
        ]
        res = DiversificationCalculator.calculate(holdings)
        assert res["hhi"] == 0.5
        assert res["diversification_score"] == 50
        assert len(res["reasons"]) > 0

    def test_risk_calculator(self):
        holdings = [
            {"symbol": "INFY", "quantity": 10, "current_price": 100.0},
        ]
        symbol_histories = {
            "INFY": [
                {"date": "2026-08-01", "close": 100.0},
                {"date": "2026-08-02", "close": 101.0},
                {"date": "2026-08-03", "close": 102.0},
                {"date": "2026-08-04", "close": 98.0},
            ]
        }
        res = RiskCalculator.calculate(holdings, symbol_histories)
        assert res["volatility"] > 0
        assert res["max_drawdown"] > 0
        assert res["value_at_risk"] > 0

    def test_performance_calculator(self):
        holdings = [
            {
                "symbol": "INFY",
                "quantity": 10,
                "average_price": 100.0,
                "current_price": 110.0,
            },
            {
                "symbol": "TCS",
                "quantity": 10,
                "average_price": 200.0,
                "current_price": 190.0,
            },
        ]
        res = PerformanceCalculator.calculate(holdings)
        assert res["best_performer"]["symbol"] == "INFY"
        assert res["worst_performer"]["symbol"] == "TCS"
        assert res["most_profitable"]["symbol"] == "INFY"
        assert res["largest_holding"]["symbol"] == "TCS"

    @patch("apps.market.services.market_service.MarketService.get_quote")
    @patch(
        "apps.market.services.market_service.MarketService.get_historical_prices"
    )
    def test_analytics_api_endpoint(
        self, mock_hist, mock_quote, auth_client_a, user_a
    ):
        portfolio = Portfolio.objects.create(
            user=user_a, name="Analytics Portfolio"
        )
        Holding.objects.create(
            portfolio=portfolio,
            symbol="INFY",
            company_name="Infosys",
            exchange="NSE",
            asset_type="STOCK",
            quantity=Decimal("10.0000"),
            average_price=Decimal("1500.00"),
            broker="ZERODHA",
        )

        mock_q = MagicMock()
        mock_q.current_price = Decimal("1600.00")
        mock_q.market_cap = 2e10
        mock_quote.return_value = mock_q

        mock_hist.return_value = [
            {"date": "2026-08-01", "close": 1500.0},
            {"date": "2026-08-02", "close": 1520.0},
            {"date": "2026-08-03", "close": 1550.0},
            {"date": "2026-08-04", "close": 1600.0},
        ]

        url = reverse("api:analytics:report")
        response = auth_client_a.get(url, {"portfolio_id": portfolio.id})
        assert response.status_code == status.HTTP_200_OK
        data = response.data
        assert "score" in data
        assert "risk" in data
        assert "allocation" in data
        assert "performance" in data
        assert "summary" in data

        assert AnalyticsReport.objects.filter(portfolio=portfolio).count() == 1
