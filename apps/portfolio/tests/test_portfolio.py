import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from apps.portfolio.models import Portfolio, Holding, Transaction, Watchlist
from apps.users.tests.factories import UserFactory

pytestmark = pytest.mark.django_db


class TestPortfolioAPI:
    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def user_b(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    @pytest.fixture
    def auth_client_b(self, user_b):
        client = APIClient()
        client.force_authenticate(user=user_b)
        return client

    def test_create_portfolio(self, auth_client_a, user_a):
        url = reverse("api:portfolio-list")
        data = {"name": "Tech Investment Portfolio"}
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Portfolio.objects.filter(user=user_a, name="Tech Investment Portfolio").exists()

    def test_list_portfolios_isolation(self, auth_client_a, auth_client_b, user_a, user_b):
        # Create portfolio for user A
        portfolio_a = Portfolio.objects.create(user=user_a, name="User A Portfolio")
        # Create portfolio for user B
        portfolio_b = Portfolio.objects.create(user=user_b, name="User B Portfolio")

        # Client A requests portfolios
        response_a = auth_client_a.get(reverse("api:portfolio-list"))
        assert response_a.status_code == status.HTTP_200_OK
        assert len(response_a.data) == 1
        assert response_a.data[0]["name"] == "User A Portfolio"

        # Client B requests portfolios
        response_b = auth_client_b.get(reverse("api:portfolio-list"))
        assert response_b.status_code == status.HTTP_200_OK
        assert len(response_b.data) == 1
        assert response_b.data[0]["name"] == "User B Portfolio"

    def test_transaction_recalculates_holding(self, auth_client_a, user_a):
        # 1. Create a Portfolio
        portfolio = Portfolio.objects.create(user=user_a, name="My Stocks")

        # 2. Add BUY transaction for AAPL: 10 shares @ $150
        tx_url = reverse("api:transaction-list")
        tx_data = {
            "portfolio": portfolio.id,
            "symbol": "AAPL",
            "transaction_type": "BUY",
            "quantity": "10.00000000",
            "price": "150.0000",
            "transaction_date": timezone.now().isoformat(),
        }
        response = auth_client_a.post(tx_url, tx_data)
        assert response.status_code == status.HTTP_201_CREATED

        # Verify Holding is created with correct qty and avg price
        holding = Holding.objects.get(portfolio=portfolio, symbol="AAPL")
        assert float(holding.quantity) == 10.0
        assert float(holding.average_price) == 150.0

        # 3. Add second BUY transaction for AAPL: 5 shares @ $165
        tx_data_2 = {
            "portfolio": portfolio.id,
            "symbol": "AAPL",
            "transaction_type": "BUY",
            "quantity": "5.00000000",
            "price": "165.0000",
            "transaction_date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_2)
        
        # Verify Holding is updated with weighted average cost basis:
        # Total Shares: 15. Total Cost: (10 * 150) + (5 * 165) = 1500 + 825 = 2325.
        # Average Price: 2325 / 15 = 155.0
        holding.refresh_from_db()
        assert float(holding.quantity) == 15.0
        assert float(holding.average_price) == 155.0

        # 4. Add SELL transaction for AAPL: 5 shares @ $180
        tx_data_sell = {
            "portfolio": portfolio.id,
            "symbol": "AAPL",
            "transaction_type": "SELL",
            "quantity": "5.00000000",
            "price": "180.0000",
            "transaction_date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_sell)

        # Average price should remain $155, but quantity decreases to 10
        holding.refresh_from_db()
        assert float(holding.quantity) == 10.0
        assert float(holding.average_price) == 155.0

        # 5. Sell remaining 10 shares
        tx_data_sell_all = {
            "portfolio": portfolio.id,
            "symbol": "AAPL",
            "transaction_type": "SELL",
            "quantity": "10.00000000",
            "price": "190.0000",
            "transaction_date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_sell_all)

        # Holding should be deleted
        assert not Holding.objects.filter(portfolio=portfolio, symbol="AAPL").exists()

    def test_watchlist_operations(self, auth_client_a, user_a):
        url = reverse("api:watchlist-list")
        data = {
            "symbol": "MSFT",
            "target_price": "400.0000",
            "notes": "Buy when it drops below 400",
        }
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Watchlist.objects.filter(user=user_a, symbol="MSFT").exists()

        # Update watchlist item
        watchlist_item = Watchlist.objects.get(user=user_a, symbol="MSFT")
        update_url = reverse("api:watchlist-detail", kwargs={"pk": watchlist_item.pk})
        update_data = {
            "symbol": "MSFT",
            "target_price": "410.0000",
            "notes": "Target price adjusted",
        }
        response = auth_client_a.put(update_url, update_data)
        assert response.status_code == status.HTTP_200_OK
        watchlist_item.refresh_from_db()
        assert float(watchlist_item.target_price) == 410.0
