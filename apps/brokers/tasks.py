from decimal import Decimal
from celery import shared_task
from django.core.files.storage import default_storage
from django.db import transaction as db_transaction
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from apps.brokers.models.import_job import ImportJob
from apps.portfolio.models import Holding, Transaction
from apps.portfolio.services.transaction_service import TransactionService
from apps.brokers.parsers.zerodha_parser import ZerodhaParser
from apps.brokers.parsers.groww_parser import GrowwParser
from apps.brokers.parsers.angelone_parser import AngelOneParser
from apps.brokers.parsers.upstox_parser import UpstoxParser


def get_parser(broker_name):
    name = broker_name.upper().strip()
    if name == "ZERODHA":
        return ZerodhaParser()
    elif name == "GROWW":
        return GrowwParser()
    elif name == "ANGELONE":
        return AngelOneParser()
    elif name == "UPSTOX":
        return UpstoxParser()
    else:
        raise ValueError(f"Unsupported broker: {broker_name}")


@shared_task()
def process_csv_import(import_job_id, file_path):
    """
    Celery task to run CSV imports in the background.
    """
    try:
        job = ImportJob.objects.get(id=import_job_id)
    except ImportJob.DoesNotExist:
        return f"ImportJob {import_job_id} not found."

    job.status = ImportJob.JobStatus.RUNNING
    job.started_at = timezone.now()
    job.save()

    try:
        # Read the file content
        with default_storage.open(file_path, "r") as f:
            csv_content = f.read()

        # Parse CSV
        parser = get_parser(job.broker)
        parsed_txs = parser.parse(csv_content)

        # Sort chronologically to prevent out-of-order SELL validations
        parsed_txs.sort(key=lambda x: x["transaction_date"])

        imported_count = 0
        failed_count = 0
        skipped_count = 0

        for index, tx in enumerate(parsed_txs, start=1):
            try:
                with db_transaction.atomic():
                    # Resolve or create the holding shell
                    holding, created = Holding.objects.get_or_create(
                        portfolio=job.portfolio,
                        symbol=tx["symbol"],
                        defaults={
                            "company_name": tx["symbol"],
                            "exchange": tx["exchange"],
                            "asset_type": "STOCK",
                            "broker": job.broker,
                        },
                    )

                    # Duplicate check:
                    # We match symbol, transaction type, quantity, price, and date
                    exists = Transaction.objects.filter(
                        holding=holding,
                        transaction_type=tx["transaction_type"],
                        quantity=tx["quantity"],
                        price=tx["price"],
                        transaction_date=tx["transaction_date"],
                    ).exists()

                    if exists:
                        skipped_count += 1
                        continue

                    # Create transaction
                    TransactionService.create_transaction(
                        {
                            "holding": holding,
                            "transaction_type": tx["transaction_type"],
                            "quantity": tx["quantity"],
                            "price": tx["price"],
                            "brokerage": tx["brokerage"],
                            "taxes": tx["taxes"],
                            "transaction_date": tx["transaction_date"],
                            "notes": tx["notes"],
                        }
                    )
                    imported_count += 1
            except ValidationError:
                failed_count += 1
            except Exception:
                failed_count += 1

        job.status = ImportJob.JobStatus.COMPLETED
        job.imported_records = imported_count
        job.failed_records = failed_count
        job.save()

    except Exception:
        job.status = ImportJob.JobStatus.FAILED
        job.save()
    finally:
        # Clean up temporary saved file
        if default_storage.exists(file_path):
            default_storage.delete(file_path)

        job.finished_at = timezone.now()
        job.save()

    return f"Completed import job {import_job_id}."
