from decimal import Decimal
from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.portfolio.models import Holding, Transaction


def create_transaction(
    holding,
    transaction_type,
    quantity,
    price,
    transaction_date,
    brokerage=Decimal("0.00"),
    taxes=Decimal("0.00"),
    notes="",
):
    """
    Creates a new transaction, validating sell quantities to prevent negative holdings,
    and updates the associated holding metrics.
    """
    with transaction.atomic():
        # Obtain write lock on the holding row to handle concurrency
        holding = Holding.objects.select_for_update().get(id=holding.id)

        qty = Decimal(str(quantity))

        # Validate that we have enough shares to sell
        if transaction_type == "SELL":
            current_qty = holding.quantity
            if current_qty < qty:
                raise ValidationError(
                    f"Insufficient quantity to sell {qty} shares. You currently own {current_qty} shares."
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
        return tx
