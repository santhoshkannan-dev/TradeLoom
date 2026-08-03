import uuid
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Portfolio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="portfolios",
        verbose_name=_("User"),
    )
    name = models.CharField(_("Portfolio Name"), max_length=255)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Portfolio")
        verbose_name_plural = _("Portfolios")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.user.email})"


class Holding(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="holdings",
        verbose_name=_("Portfolio"),
    )
    symbol = models.CharField(_("Symbol"), max_length=50)
    company_name = models.CharField(_("Company Name"), max_length=255, blank=True)
    exchange = models.CharField(_("Exchange"), max_length=50, blank=True)
    quantity = models.DecimalField(
        _("Quantity"), max_digits=18, decimal_places=8, default=0.0
    )
    average_price = models.DecimalField(
        _("Average Price"), max_digits=18, decimal_places=4, default=0.0
    )
    current_price = models.DecimalField(
        _("Current Price"), max_digits=18, decimal_places=4, null=True, blank=True
    )
    sector = models.CharField(_("Sector"), max_length=100, blank=True)
    industry = models.CharField(_("Industry"), max_length=100, blank=True)
    asset_type = models.CharField(_("Asset Type"), max_length=50, default="EQUITY")
    broker = models.CharField(_("Broker"), max_length=100, blank=True)
    purchase_date = models.DateField(_("Purchase Date"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Holding")
        verbose_name_plural = _("Holdings")
        unique_together = ("portfolio", "symbol")
        ordering = ["symbol"]

    def __str__(self):
        return f"{self.symbol} - {self.quantity} shares in {self.portfolio.name}"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ("BUY", _("Buy")),
        ("SELL", _("Sell")),
        ("DIVIDEND", _("Dividend")),
        ("BONUS", _("Bonus")),
        ("SPLIT", _("Split")),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="transactions",
        verbose_name=_("Portfolio"),
    )
    symbol = models.CharField(_("Symbol"), max_length=50)
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
    amount = models.DecimalField(
        _("Net Amount"), max_digits=18, decimal_places=4, default=0.0
    )
    transaction_date = models.DateTimeField(_("Transaction Date"))
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")
        ordering = ["-transaction_date", "-created_at"]

    def __str__(self):
        return f"{self.transaction_type} {self.symbol} {self.quantity} @ {self.price} in {self.portfolio.name}"

    def save(self, *args, **kwargs):
        # Auto-calculate amount if it's 0 or not provided for BUY/SELL/DIVIDEND
        if not self.amount or self.amount == 0.0:
            if self.transaction_type in ("BUY", "SELL"):
                self.amount = self.quantity * self.price
            elif self.transaction_type == "DIVIDEND":
                # For DIVIDEND, quantity could be the shares held, price could be dividend per share, or amount is just directly the payout.
                self.amount = self.quantity * self.price
        super().save(*args, **kwargs)

        # Triggers recalculation of the holding
        from apps.portfolio.services import recalculate_holding
        recalculate_holding(self.portfolio, self.symbol)

    def delete(self, *args, **kwargs):
        portfolio = self.portfolio
        symbol = self.symbol
        super().delete(*args, **kwargs)
        from apps.portfolio.services import recalculate_holding
        recalculate_holding(portfolio, symbol)


class Watchlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="watchlist_items",
        verbose_name=_("User"),
    )
    symbol = models.CharField(_("Symbol"), max_length=50)
    target_price = models.DecimalField(
        _("Target Price"), max_digits=18, decimal_places=4, null=True, blank=True
    )
    notes = models.TextField(_("Notes"), blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Watchlist Item")
        verbose_name_plural = _("Watchlist Items")
        unique_together = ("user", "symbol")
        ordering = ["symbol"]

    def __str__(self):
        return f"{self.symbol} (Target: {self.target_price}) for {self.user.email}"
