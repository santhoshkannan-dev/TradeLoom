from decimal import Decimal
from django.db import models
from common.models import BaseModel
from common.constants.choices import (
    AssetType,
    Broker,
    Exchange,
)
from .portfolio import Portfolio


class Holding(BaseModel):
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="holdings",
    )

    symbol = models.CharField(max_length=20)

    company_name = models.CharField(max_length=200)

    exchange = models.CharField(
        max_length=20,
        choices=Exchange.choices,
        default=Exchange.NSE,
    )

    asset_type = models.CharField(
        max_length=20,
        choices=AssetType.choices,
        default=AssetType.STOCK,
    )

    quantity = models.DecimalField(
        max_digits=15,
        decimal_places=4,
        default=Decimal("0"),
    )

    average_price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=Decimal("0.00"),
    )

    broker = models.CharField(
        max_length=30,
        choices=Broker.choices,
        default=Broker.MANUAL,
    )

    sector = models.CharField(
        max_length=100,
        blank=True,
    )

    industry = models.CharField(
        max_length=100,
        blank=True,
    )

    class Meta(BaseModel.Meta):
        ordering = ["symbol"]
        unique_together = (
            "portfolio",
            "symbol",
        )

    def __str__(self):
        return f"{self.symbol} ({self.quantity})"
