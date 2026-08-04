import io
import pytest
from decimal import Decimal
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.users.tests.factories import UserFactory
from apps.portfolio.models import Portfolio, Holding, Transaction
from apps.brokers.models.broker_account import BrokerAccount
from apps.brokers.services.import_service import ImportService
from apps.brokers.adapters.csv import CSVBrokerAdapter

pytestmark = pytest.mark.django_db


class TestBrokersAPI:
    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    def test_csv_adapter_parsing(self):
        csv_data = (
            "symbol,exchange,transaction_type,quantity,price,brokerage,taxes,transaction_date,notes\n"
            "INFY,NSE,BUY,10,1500.00,10.00,5.00,2026-08-01T10:00:00Z,Initial buy\n"
            "INFY,NSE,SELL,5,1600.00,5.00,2.50,2026-08-02T10:00:00Z,Partial sell\n"
        )
        adapter = CSVBrokerAdapter(csv_data)
        txs = adapter.fetch_transactions()

        assert len(txs) == 2
        assert txs[0]["symbol"] == "INFY"
        assert txs[0]["transaction_type"] == "BUY"
        assert txs[0]["quantity"] == Decimal("10")
        assert txs[0]["price"] == Decimal("1500.00")

        assert txs[1]["symbol"] == "INFY"
        assert txs[1]["transaction_type"] == "SELL"
        assert txs[1]["quantity"] == Decimal("5")

    def test_import_service_valid_csv(self, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Import Portfolio")
        csv_data = (
            "symbol,exchange,transaction_type,quantity,price,brokerage,taxes,transaction_date,notes\n"
            "INFY,NSE,BUY,10,1500.00,10.00,5.00,2026-08-01T10:00:00Z,Buy\n"
            "INFY,NSE,SELL,5,1600.00,5.00,2.50,2026-08-02T10:00:00Z,Sell\n"
        )

        summary = ImportService.import_portfolio_csv(
            user_a, portfolio.id, csv_data
        )
        assert summary["success"] is True
        assert summary["records_imported"] == 2
        assert len(summary["errors"]) == 0

        # Holding should be created
        holding = Holding.objects.get(portfolio=portfolio, symbol="INFY")
        assert float(holding.quantity) == 5.0
        assert float(holding.average_price) == pytest.approx(1501.50)

    def test_import_service_invalid_sales_skipped(self, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Import Portfolio")
        csv_data = (
            "symbol,exchange,transaction_type,quantity,price,brokerage,taxes,transaction_date,notes\n"
            "INFY,NSE,BUY,5,1500.00,0,0,2026-08-01T10:00:00Z,Buy\n"
            "INFY,NSE,SELL,10,1600.00,0,0,2026-08-02T10:00:00Z,Invalid Sell\n"
        )

        summary = ImportService.import_portfolio_csv(
            user_a, portfolio.id, csv_data
        )
        assert summary["success"] is False
        assert summary["records_imported"] == 1
        assert len(summary["errors"]) == 1
        assert "Cannot sell more shares than available" in summary["errors"][0]

        # Valid BUY was recorded
        holding = Holding.objects.get(portfolio=portfolio, symbol="INFY")
        assert float(holding.quantity) == 5.0

    def test_csv_import_api_endpoint(self, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Import Portfolio")
        csv_data = (
            "symbol,exchange,transaction_type,quantity,price,brokerage,taxes,transaction_date,notes\n"
            "INFY,NSE,BUY,10,1500.00,10.00,5.00,2026-08-01T10:00:00Z,Buy\n"
        )

        uploaded_file = SimpleUploadedFile(
            "portfolio.csv", csv_data.encode("utf-8"), content_type="text/csv"
        )

        url = reverse("api:brokers:import-csv")
        data = {
            "portfolio": portfolio.id,
            "file": uploaded_file,
        }

        response = auth_client_a.post(url, data, format="multipart")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["success"] is True
        assert response.data["records_imported"] == 1

    def test_broker_accounts_crud(self, auth_client_a, user_a):
        url = reverse("api:brokers:account-list")
        data = {
            "broker_name": "ZERODHA",
            "account_id": "XY12345",
        }
        response = auth_client_a.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["broker_name"] == "ZERODHA"
        assert response.data["status"] == "CONNECTED"

        response = auth_client_a.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
