from django.db import models


class AssetType(models.TextChoices):
    STOCK = "STOCK", "Stock"
    ETF = "ETF", "ETF"
    MUTUAL_FUND = "MF", "Mutual Fund"
    CRYPTO = "CRYPTO", "Crypto"
    GOLD = "GOLD", "Gold"


class Exchange(models.TextChoices):
    NSE = "NSE", "NSE"
    BSE = "BSE", "BSE"
    NASDAQ = "NASDAQ", "NASDAQ"
    NYSE = "NYSE", "NYSE"


class Broker(models.TextChoices):
    MANUAL = "MANUAL", "Manual"
    ZERODHA = "ZERODHA", "Zerodha"
    GROWW = "GROWW", "Groww"
    ANGELONE = "ANGELONE", "Angel One"
    UPSTOX = "UPSTOX", "Upstox"
