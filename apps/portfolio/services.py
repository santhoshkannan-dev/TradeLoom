from django.db import transaction


def recalculate_holding(portfolio, symbol):
    """
    Recalculates quantity and average price of a holding for a given portfolio and symbol,
    by summing up all historical BUY, SELL, BONUS, and SPLIT transactions.
    """
    from apps.portfolio.models import Holding
    from apps.portfolio.models import Transaction

    with transaction.atomic():
        txs = Transaction.objects.filter(portfolio=portfolio, symbol=symbol).order_by(
            "transaction_date", "created_at"
        )

        if not txs.exists():
            Holding.objects.filter(portfolio=portfolio, symbol=symbol).delete()
            return

        qty = 0
        total_cost = 0
        average_price = 0
        last_purchase_date = None
        last_broker = ""

        for tx in txs:
            if tx.transaction_type == "BUY":
                qty += tx.quantity
                total_cost += tx.quantity * tx.price
                if qty > 0:
                    average_price = total_cost / qty
                last_purchase_date = tx.transaction_date.date()
            elif tx.transaction_type == "SELL":
                qty -= tx.quantity
                if qty <= 0:
                    qty = 0
                    total_cost = 0
                    average_price = 0
                else:
                    total_cost = qty * average_price
            elif tx.transaction_type == "BONUS":
                qty += tx.quantity
                if qty > 0:
                    average_price = total_cost / qty
            elif tx.transaction_type == "SPLIT":
                # A split adjusts the quantity and the average price.
                # In SPLIT transactions:
                # - price can represent the split ratio or the new unit price.
                # - quantity can represent the split ratio (e.g. 2.0 for 2-for-1).
                # If quantity > 0, we multiply current holding quantity by this ratio.
                ratio = tx.quantity
                if ratio > 0:
                    qty = qty * ratio
                    average_price = average_price / ratio

        if qty > 0:
            holding, created = Holding.objects.get_or_create(
                portfolio=portfolio,
                symbol=symbol,
                defaults={
                    "quantity": qty,
                    "average_price": average_price,
                    "purchase_date": last_purchase_date,
                },
            )
            if not created:
                holding.quantity = qty
                holding.average_price = average_price
                if last_purchase_date:
                    holding.purchase_date = last_purchase_date
                holding.save()
        else:
            Holding.objects.filter(portfolio=portfolio, symbol=symbol).delete()
