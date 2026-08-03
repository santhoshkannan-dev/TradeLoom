from decimal import Decimal
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel
from .holding import Holding


class TransactionType(models.TextChoices):
    BUY = "BUY", "Buy"
    SELL = "SELL", "Sell"
    DIVIDEND = "DIVIDEND", "Dividend"
    BONUS = "BONUS", "Bonus"
    SPLIT = "SPLIT", "Split"


class Transaction(BaseModel):
    holding = models.ForeignKey(
        Holding,
        on_delete=models.CASCADE,
        related_name="transactions",
        verbose_name=_("Holding"),
    )
    transaction_type = models.CharField(
        _("Transaction Type"),
        max_length=20,
        choices=TransactionType.choices,
    )
    quantity = models.DecimalField(
        _("Quantity"), max_digits=15, decimal_places=4
    )
    price = models.DecimalField(
        _("Price"), max_digits=15, decimal_places=2
    )
    brokerage = models.DecimalField(
        _("Brokerage"), max_digits=10, decimal_places=2, default=Decimal("0")
    )
    taxes = models.DecimalField(
        _("Taxes"), max_digits=10, decimal_places=2, default=Decimal("0")
    )
    transaction_date = models.DateTimeField(_("Transaction Date"))
    notes = models.TextField(_("Notes"), blank=True)

    class Meta(BaseModel.Meta):
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")
        ordering = ["-transaction_date", "-created_at"]

    def __str__(self):
        return f"{self.transaction_type} {self.holding.symbol} {self.quantity} @ {self.price}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        from apps.portfolio.services.portfolio_service import recalculate_holding
        recalculate_holding(self.holding.portfolio, self.holding.symbol)

    def delete(self, *args, **kwargs):
        portfolio = self.holding.portfolio
        symbol = self.holding.symbol
        super().delete(*args, **kwargs)
        from apps.portfolio.services.portfolio_service import recalculate_holding
        recalculate_holding(portfolio, symbol)
