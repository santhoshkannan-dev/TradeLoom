import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from .holding import Holding


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ("BUY", _("Buy")),
        ("SELL", _("Sell")),
        ("DIVIDEND", _("Dividend")),
        ("BONUS", _("Bonus")),
        ("SPLIT", _("Split")),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    holding = models.ForeignKey(
        Holding,
        on_delete=models.CASCADE,
        related_name="transactions",
        verbose_name=_("Holding"),
    )
    transaction_type = models.CharField(
        _("Transaction Type"),
        max_length=20,
        choices=TRANSACTION_TYPES,
    )
    quantity = models.DecimalField(
        _("Quantity"), max_digits=18, decimal_places=8, default=0.0
    )
    price = models.DecimalField(
        _("Price"), max_digits=18, decimal_places=4, default=0.0
    )
    broker_charge = models.DecimalField(
        _("Broker Charge"), max_digits=18, decimal_places=4, default=0.0
    )
    tax = models.DecimalField(
        _("Tax"), max_digits=18, decimal_places=4, default=0.0
    )
    date = models.DateTimeField(_("Transaction Date"))
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.transaction_type} {self.holding.symbol} {self.quantity} @ {self.price} in {self.holding.portfolio.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Triggers recalculation of the holding
        from apps.portfolio.services.portfolio_service import recalculate_holding
        recalculate_holding(self.holding.portfolio, self.holding.symbol)

    def delete(self, *args, **kwargs):
        portfolio = self.holding.portfolio
        symbol = self.holding.symbol
        super().delete(*args, **kwargs)
        from apps.portfolio.services.portfolio_service import recalculate_holding
        recalculate_holding(portfolio, symbol)
