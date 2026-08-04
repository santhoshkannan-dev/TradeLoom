from decimal import Decimal
from django.db import transaction as db_transaction
from rest_framework.exceptions import ValidationError
from apps.portfolio.models.transaction import Transaction
from apps.portfolio.models.holding import Holding
from apps.portfolio.services.holding_service import HoldingService


class TransactionService:
    @staticmethod
    def create_transaction(data):
        """
        Creates a transaction and triggers holding recalculations.
        """
        with db_transaction.atomic():
            holding = data.get("holding")
            transaction_type = data.get("transaction_type")
            quantity = Decimal(str(data.get("quantity", 0.0)))
            price = Decimal(str(data.get("price", 0.0)))
            brokerage = Decimal(str(data.get("brokerage", 0.0)))
            taxes = Decimal(str(data.get("taxes", 0.0)))
            transaction_date = data.get("transaction_date")
            notes = data.get("notes", "")

            # Concurrency write-lock on the holding row
            holding = Holding.objects.select_for_update().get(id=holding.id)

            # Validate sell quantity to prevent negative holdings
            if transaction_type == "SELL":
                current_qty = holding.quantity
                if current_qty < quantity:
                    raise ValidationError(
                        f"Cannot sell more shares than available. You own {current_qty} shares, but tried to sell {quantity}."
                    )

            tx = Transaction.objects.create(
                holding=holding,
                transaction_type=transaction_type,
                quantity=quantity,
                price=price,
                brokerage=brokerage,
                taxes=taxes,
                transaction_date=transaction_date,
                notes=notes,
            )

            # Recalculate holding average price & quantity
            HoldingService.recalculate_holding(holding.portfolio, holding.symbol)
            return tx

    @staticmethod
    def update_holding(transaction):
        """
        Triggers recalculation for a specific transaction's holding.
        """
        HoldingService.recalculate_holding(
            transaction.holding.portfolio, transaction.holding.symbol
        )
