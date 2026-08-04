import csv
import io
from decimal import Decimal
from django.utils import timezone
from .base import BrokerAdapter


class CSVBrokerAdapter(BrokerAdapter):
    def __init__(self, file_content):
        self.file_content = file_content

    def fetch_holdings(self):
        return []

    def fetch_transactions(self):
        """
        Parses transactions from uploaded CSV.
        Expected columns: symbol, exchange, transaction_type, quantity, price, brokerage, taxes, transaction_date
        """
        transactions = []
        f = io.StringIO(self.file_content)
        reader = csv.DictReader(f)

        for row in reader:
            cleaned_row = {
                k.strip().lower(): v.strip() for k, v in row.items() if k is not None
            }

            symbol = cleaned_row.get("symbol")
            if not symbol:
                continue

            tx_type = cleaned_row.get("transaction_type", "BUY").upper()
            qty = Decimal(cleaned_row.get("quantity", "0"))
            price = Decimal(cleaned_row.get("price", "0"))
            brokerage = Decimal(cleaned_row.get("brokerage", "0"))
            taxes = Decimal(cleaned_row.get("taxes", "0"))

            tx_date_str = cleaned_row.get("transaction_date")
            if tx_date_str:
                try:
                    from django.utils.dateparse import parse_datetime

                    tx_date = parse_datetime(tx_date_str)
                    if not tx_date:
                        tx_date = timezone.now()
                except Exception:
                    tx_date = timezone.now()
            else:
                tx_date = timezone.now()

            exchange = cleaned_row.get("exchange", "NSE").upper()

            transactions.append(
                {
                    "symbol": symbol.upper(),
                    "exchange": exchange,
                    "transaction_type": tx_type,
                    "quantity": qty,
                    "price": price,
                    "brokerage": brokerage,
                    "taxes": taxes,
                    "transaction_date": tx_date,
                    "notes": cleaned_row.get("notes", ""),
                }
            )

        return transactions

    def fetch_profile(self):
        return {"broker": "CSV Import"}
