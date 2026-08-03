import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from apps.portfolio.models.portfolio import Portfolio
from apps.portfolio.models.holding import Holding
from apps.portfolio.models.transaction import Transaction
from apps.portfolio.models.watchlist import Watchlist
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
        data = {
            "name": "Retirement Portfolio",
            "description": "Long-term investment portfolio",
            "base_currency": "USD",
        }
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        
        portfolio = Portfolio.objects.get(user=user_a, name="Retirement Portfolio")
        assert portfolio.description == "Long-term investment portfolio"
        assert portfolio.base_currency == "USD"

    def test_list_portfolios_isolation(self, auth_client_a, auth_client_b, user_a, user_b):
        # Create portfolio for user A
        Portfolio.objects.create(user=user_a, name="User A Portfolio")
        # Create portfolio for user B
        Portfolio.objects.create(user=user_b, name="User B Portfolio")

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

    def test_create_holding_with_initial_transaction(self, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="My Holdings")
        
        url = reverse("api:holding-list")
        data = {
            "portfolio": portfolio.id,
            "symbol": "AAPL",
            "company_name": "Apple Inc.",
            "exchange": "NASDAQ",
            "asset_type": "EQUITY",
            "broker": "Zerodha",
            "quantity": "10.00000000",
            "average_price": "150.0000",
        }
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        
        # Verify holding exists and average price/qty is populated
        holding = Holding.objects.get(portfolio=portfolio, symbol="AAPL")
        assert float(holding.quantity) == 10.0
        assert float(holding.average_price) == 150.0
        
        # Verify transaction of type BUY was automatically generated
        assert Transaction.objects.filter(holding=holding, transaction_type="BUY", quantity=10.0, price=150.0).exists()

    def test_transactions_and_recalculations(self, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Speculative Portfolio")
        
        # 1. Create a Holding shell (without quantity/price)
        holding = Holding.objects.create(
            portfolio=portfolio,
            symbol="TSLA",
            company_name="Tesla, Inc.",
            exchange="NASDAQ",
            asset_type="EQUITY",
        )

        # 2. Add BUY transaction: 10 shares @ $200
        tx_url = reverse("api:transaction-list")
        tx_data_1 = {
            "holding": holding.id,
            "transaction_type": "BUY",
            "quantity": "10.00000000",
            "price": "200.0000",
            "broker_charge": "5.0000",
            "tax": "2.0000",
            "date": timezone.now().isoformat(),
        }
        response = auth_client_a.post(tx_url, tx_data_1)
        assert response.status_code == status.HTTP_201_CREATED

        # Verify Holding quantity and average price (includes charges and taxes)
        # Total cost: (10 * 200) + 5 + 2 = 2007. Average price: 2007 / 10 = 200.7
        holding.refresh_from_db()
        assert float(holding.quantity) == 10.0
        assert float(holding.average_price) == 200.7

        # 3. Add second BUY transaction: 5 shares @ $220, no charges/tax
        tx_data_2 = {
            "holding": holding.id,
            "transaction_type": "BUY",
            "quantity": "5.00000000",
            "price": "220.0000",
            "date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_2)

        # Total shares: 15. Previous cost: 2007. New purchase cost: 5 * 220 = 1100.
        # Total cost: 3107. Average price: 3107 / 15 = 207.1333
        holding.refresh_from_db()
        assert float(holding.quantity) == 15.0
        assert round(float(holding.average_price), 4) == round(3107 / 15, 4)

        # 4. Add SELL transaction: 5 shares @ $250
        tx_data_sell = {
            "holding": holding.id,
            "transaction_type": "SELL",
            "quantity": "5.00000000",
            "price": "250.0000",
            "date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_sell)

        # Shares decrease to 10. Average price remains identical.
        holding.refresh_from_db()
        assert float(holding.quantity) == 10.0
        assert round(float(holding.average_price), 4) == round(3107 / 15, 4)

        # 5. Sell remaining 10 shares -> verify holding gets deleted
        tx_data_sell_all = {
            "holding": holding.id,
            "transaction_type": "SELL",
            "quantity": "10.00000000",
            "price": "260.0000",
            "date": timezone.now().isoformat(),
        }
        auth_client_a.post(tx_url, tx_data_sell_all)
        assert not Holding.objects.filter(id=holding.id).exists()

    def test_watchlist_operations(self, auth_client_a, user_a):
        url = reverse("api:watchlist-list")
        data = {
            "symbol": "GOOGL",
            "target_price": "150.0000",
            "notes": "Buy target",
        }
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Watchlist.objects.filter(user=user_a, symbol="GOOGL").exists()
