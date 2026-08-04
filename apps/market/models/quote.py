from decimal import Decimal
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel


class MarketQuote(BaseModel):
    symbol = models.CharField(
        _("Symbol"), max_length=50, unique=True, db_index=True
    )
    current_price = models.DecimalField(
        _("Current Price"),
        max_digits=18,
        decimal_places=4,
        default=Decimal("0.0000"),
    )
    previous_close = models.DecimalField(
        _("Previous Close"),
        max_digits=18,
        decimal_places=4,
        default=Decimal("0.0000"),
    )
    change = models.DecimalField(
        _("Change"),
        max_digits=18,
        decimal_places=4,
        default=Decimal("0.0000"),
    )
    change_percent = models.DecimalField(
        _("Change Percent"),
        max_digits=10,
        decimal_places=4,
        default=Decimal("0.0000"),
    )
    volume = models.BigIntegerField(_("Volume"), default=0)
    market_cap = models.BigIntegerField(
        _("Market Cap"), default=0, null=True, blank=True
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("Market Quote")
        verbose_name_plural = _("Market Quotes")
        ordering = ["symbol"]

    def __str__(self):
        return f"{self.symbol} - {self.current_price}"
