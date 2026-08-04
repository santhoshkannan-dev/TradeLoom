import io
import pytest
from decimal import Decimal
from unittest.mock import patch, MagicMock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from apps.users.tests.factories import UserFactory
from apps.portfolio.models import Portfolio, Holding, Transaction
from apps.brokers.models.broker_account import BrokerAccount
from apps.brokers.models.import_job import ImportJob
from apps.brokers.services.import_service import ImportService
from apps.brokers.tasks import process_csv_import
from apps.brokers.parsers.zerodha_parser import ZerodhaParser
from apps.brokers.parsers.groww_parser import GrowwParser
from apps.brokers.parsers.angelone_parser import AngelOneParser
from apps.brokers.parsers.upstox_parser import UpstoxParser

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

    def test_zerodha_parser(self):
        csv_data = (
            "Symbol,Quantity,Average Price,Transaction Type,Exchange\n"
            "INFY,20,1540.00,BUY,NSE\n"
        )
        parser = ZerodhaParser()
        txs = parser.parse(csv_data)
        assert len(txs) == 1
        assert txs[0]["symbol"] == "INFY"
        assert txs[0]["quantity"] == Decimal("20")
        assert txs[0]["price"] == Decimal("1540.00")
        assert txs[0]["transaction_type"] == "BUY"

    def test_groww_parser(self):
        csv_data = (
            "Stock Name,Units,Buy Price,Transaction Type,Exchange\n"
            "Infosys,10,1500.00,BUY,NSE\n"
        )
        parser = GrowwParser()
        txs = parser.parse(csv_data)
        assert len(txs) == 1
        assert txs[0]["symbol"] == "INFY"
        assert txs[0]["quantity"] == Decimal("10")
        assert txs[0]["price"] == Decimal("1500.00")

    def test_angelone_parser(self):
        csv_data = (
            "Symbol,Qty,Avg Price,Transaction Type,Exchange\n"
            "TCS,5,3400.00,BUY,NSE\n"
        )
        parser = AngelOneParser()
        txs = parser.parse(csv_data)
        assert len(txs) == 1
        assert txs[0]["symbol"] == "TCS"
        assert txs[0]["quantity"] == Decimal("5")
        assert txs[0]["price"] == Decimal("3400.00")

    def test_upstox_parser(self):
        csv_data = (
            "Ticker,Quantity,Price,Transaction Type,Exchange\n"
            "RELIANCE,15,2500.00,BUY,NSE\n"
        )
        parser = UpstoxParser()
        txs = parser.parse(csv_data)
        assert len(txs) == 1
        assert txs[0]["symbol"] == "RELIANCE"
        assert txs[0]["quantity"] == Decimal("15")
        assert txs[0]["price"] == Decimal("2500.00")

    def test_process_csv_import_task(self, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Celery Portfolio")
        csv_data = (
            "Symbol,Quantity,Average Price,Transaction Type,Exchange\n"
            "INFY,20,1540.00,BUY,NSE\n"
        )
        file_path = default_storage.save(
            "test_import.csv", ContentFile(csv_data.encode("utf-8"))
        )

        job = ImportJob.objects.create(
            user=user_a,
            portfolio=portfolio,
            broker="ZERODHA",
            file_name="test_import.csv",
            status=ImportJob.JobStatus.PENDING,
        )

        res = process_csv_import(job.id, file_path)
        assert "Completed import job" in res

        job.refresh_from_db()
        assert job.status == ImportJob.JobStatus.COMPLETED
        assert job.imported_records == 1
        assert job.failed_records == 0
        assert not default_storage.exists(file_path)

        # Holding should be created
        holding = Holding.objects.get(portfolio=portfolio, symbol="INFY")
        assert float(holding.quantity) == 20.0

    def test_duplicate_rows_are_skipped(self, user_a):
        portfolio = Portfolio.objects.create(
            user=user_a, name="Duplicate Portfolio"
        )

        # Pre-populate transaction
        holding = Holding.objects.create(
            portfolio=portfolio,
            symbol="INFY",
            company_name="Infosys",
            exchange="NSE",
            asset_type="STOCK",
            broker="ZERODHA",
        )
        # We need a stable date for duplicate matching
        from django.utils.dateparse import parse_datetime

        fixed_date = parse_datetime("2026-08-01T10:00:00Z")

        Transaction.objects.create(
            holding=holding,
            transaction_type="BUY",
            quantity=Decimal("10.0000"),
            price=Decimal("1500.00"),
            transaction_date=fixed_date,
        )

        csv_data = (
            "Symbol,Quantity,Average Price,Transaction Type,Exchange,Transaction_Date\n"
            "INFY,10,1500.00,BUY,NSE,2026-08-01T10:00:00Z\n"  # Duplicate row
            "INFY,5,1600.00,BUY,NSE,2026-08-02T10:00:00Z\n"  # New row
        )
        file_path = default_storage.save(
            "test_dups.csv", ContentFile(csv_data.encode("utf-8"))
        )

        job = ImportJob.objects.create(
            user=user_a,
            portfolio=portfolio,
            broker="ZERODHA",
            file_name="test_dups.csv",
            status=ImportJob.JobStatus.PENDING,
        )

        process_csv_import(job.id, file_path)
        job.refresh_from_db()

        # 1 imported, 1 duplicate skipped
        assert job.imported_records == 1
        assert Holding.objects.get(
            portfolio=portfolio, symbol="INFY"
        ).quantity == Decimal("15.0000")

    @patch("apps.brokers.api.views.broker.process_csv_import.delay")
    def test_csv_import_api_endpoint(self, mock_delay, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="Import Portfolio")
        csv_data = (
            "Symbol,Quantity,Average Price,Transaction Type,Exchange\n"
            "INFY,20,1540.00,BUY,NSE\n"
        )
        uploaded_file = SimpleUploadedFile(
            "portfolio.csv", csv_data.encode("utf-8"), content_type="text/csv"
        )

        url = reverse("api:brokers:import-csv")
        data = {
            "portfolio": portfolio.id,
            "broker": "ZERODHA",
            "file": uploaded_file,
        }

        response = auth_client_a.post(url, data, format="multipart")
        assert response.status_code == status.HTTP_202_ACCEPTED
        assert response.data["status"] == "PENDING"
        assert response.data["broker"] == "ZERODHA"
        assert mock_delay.called

    def test_import_history_endpoints(self, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="History Portfolio")
        job = ImportJob.objects.create(
            user=user_a,
            portfolio=portfolio,
            broker="ZERODHA",
            file_name="import.csv",
            status=ImportJob.JobStatus.COMPLETED,
            imported_records=10,
        )

        # List
        url = reverse("api:brokers:import-history-list")
        response = auth_client_a.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

        # Retrieve
        detail_url = reverse("api:brokers:import-history-detail", args=[job.id])
        response = auth_client_a.get(detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["imported_records"] == 10
        assert response.data["status"] == "COMPLETED"
