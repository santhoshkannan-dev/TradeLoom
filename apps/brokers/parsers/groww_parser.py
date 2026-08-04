import csv
import io
from decimal import Decimal
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from .base import CSVParser


class GrowwParser(CSVParser):
    def parse(self, file_content):
        transactions = []
        f = io.StringIO(file_content)
        reader = csv.DictReader(f)

        name_map = {
            "INFOSYS": "INFY",
            "INFOSYS LTD": "INFY",
            "TCS LTD": "TCS",
            "TATA CONSULTANCY SERVICES": "TCS",
            "RELIANCE INDUSTRIES": "RELIANCE",
        }

        for row in reader:
            cleaned = {
                k.strip().lower(): v.strip() for k, v in row.items() if k is not None
            }
            stock_name = cleaned.get("stock name")
            if not stock_name:
                continue

            # Standardize symbol using name_map or fallback
            symbol_key = stock_name.upper().strip()
            symbol = name_map.get(symbol_key, symbol_key)

            qty = Decimal(cleaned.get("units") or cleaned.get("quantity") or "0")
            price = Decimal(
                cleaned.get("buy price") or cleaned.get("price") or "0"
            )
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
                    "notes": cleaned.get("notes") or "Groww CSV Import",
                }
            )
        return transactions
