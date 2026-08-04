from decimal import Decimal
from django.db import transaction as db_transaction
from rest_framework.exceptions import ValidationError
from apps.portfolio.models import Portfolio, Holding
from apps.portfolio.services.transaction_service import TransactionService
from apps.brokers.adapters.csv import CSVBrokerAdapter


class ImportService:
    @staticmethod
    def import_portfolio_csv(user, portfolio_id, csv_content):
        """
        Parses portfolio transactions from a CSV file, sorts them chronologically,
        and saves them. Returns a summary of successfully imported rows and errors.
        """
        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=user)
        except Portfolio.DoesNotExist:
            raise ValidationError("Portfolio does not exist or does not belong to you.")

        adapter = CSVBrokerAdapter(csv_content)
        parsed_txs = adapter.fetch_transactions()

        # Sort chronologically to prevent transient short-selling validation errors
        parsed_txs.sort(key=lambda x: x["transaction_date"])

        records_imported = 0
        errors = []

        for index, tx in enumerate(parsed_txs, start=1):
            try:
                with db_transaction.atomic():
                    # Resolve or create the holding shell
                    holding, created = Holding.objects.get_or_create(
                        portfolio=portfolio,
                        symbol=tx["symbol"],
                        defaults={
                            "company_name": tx["symbol"],
                            "exchange": tx["exchange"],
                            "asset_type": "STOCK",
                            "broker": "MANUAL",
                        },
                    )

                    # Create the transaction
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
                    records_imported += 1
            except ValidationError as e:
                errors.append(f"Row {index} ({tx['symbol']}): {str(e)}")
            except Exception as e:
                errors.append(
                    f"Row {index} ({tx['symbol']}): Unexpected error: {str(e)}"
                )

        return {
            "success": len(errors) == 0,
            "records_imported": records_imported,
            "errors": errors,
        }
