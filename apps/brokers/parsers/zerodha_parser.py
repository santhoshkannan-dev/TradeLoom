import csv
import io
from decimal import Decimal
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from .base import CSVParser


class ZerodhaParser(CSVParser):
    def parse(self, file_content):
        transactions = []
        f = io.StringIO(file_content)
        reader = csv.DictReader(f)
        for row in reader:
            cleaned = {
                k.strip().lower(): v.strip() for k, v in row.items() if k is not None
            }
            symbol = cleaned.get("symbol")
            if not symbol:
                continue

            qty = Decimal(cleaned.get("quantity") or "0")
            price = Decimal(cleaned.get("average price") or cleaned.get("price") or "0")
            tx_type = cleaned.get("transaction_type") or cleaned.get("type") or "BUY"
            exchange = cleaned.get("exchange", "NSE").upper()
            brokerage = Decimal(cleaned.get("brokerage", "0"))
            taxes = Decimal(cleaned.get("taxes", "0"))

            date_str = (
                cleaned.get("transaction_date")
                or cleaned.get("date")
                or cleaned.get("time")
            )
            if date_str:
                tx_date = parse_datetime(date_str) or timezone.now()
            else:
                tx_date = timezone.now()

            transactions.append(
                {
                    "symbol": symbol.upper(),
                    "exchange": exchange,
                    "transaction_type": tx_type.upper(),
                    "quantity": qty,
                    "price": price,
                    "brokerage": brokerage,
                    "taxes": taxes,
                    "transaction_date": tx_date,
                    "notes": cleaned.get("notes") or "Zerodha CSV Import",
                }
            )
        return transactions
