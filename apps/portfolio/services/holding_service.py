from django.db import transaction as db_transaction


class HoldingService:
    @staticmethod
    def recalculate_holding(portfolio, symbol):
        """
        Recalculates the quantity and average price (cost basis) of a holding
        based on all its associated transactions, ordered chronologically.
        """
        from apps.portfolio.models.holding import Holding
        from apps.portfolio.models.transaction import Transaction

        with db_transaction.atomic():
            try:
                holding = Holding.objects.get(portfolio=portfolio, symbol=symbol)
            except Holding.DoesNotExist:
                return

            txs = holding.transactions.all().order_by("transaction_date", "created_at")

            if not txs.exists():
                holding.delete()
                return

            qty = 0.0
            total_cost = 0.0
            average_price = 0.0

            for tx in txs:
                tx_qty = float(tx.quantity)
                tx_price = float(tx.price)
                tx_brokerage = float(tx.brokerage)
                tx_taxes = float(tx.taxes)

                if tx.transaction_type == "BUY":
                    qty += tx_qty
                    # Cost basis includes the purchase price plus brokerage/taxes
                    total_cost += (tx_qty * tx_price) + tx_brokerage + tx_taxes
                    if qty > 0:
                        average_price = total_cost / qty
                elif tx.transaction_type == "SELL":
                    qty -= tx_qty
                    if qty <= 0.0:
                        qty = 0.0
                        total_cost = 0.0
                        average_price = 0.0
                    else:
                        total_cost = qty * average_price
                elif tx.transaction_type == "BONUS":
                    qty += tx_qty
                    if qty > 0:
                        average_price = total_cost / qty
                elif tx.transaction_type == "SPLIT":
                    ratio = tx_qty
                    if ratio > 0:
                        qty = qty * ratio
                        average_price = average_price / ratio

            if qty > 0.0:
                holding.quantity = qty
                holding.average_price = average_price
                holding.save()
            else:
                holding.delete()
