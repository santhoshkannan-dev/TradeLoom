import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from .portfolio import Portfolio


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
    asset_type = models.CharField(_("Asset Type"), max_length=50, default="EQUITY")
    sector = models.CharField(_("Sector"), max_length=100, blank=True)
    industry = models.CharField(_("Industry"), max_length=100, blank=True)
    quantity = models.DecimalField(
        _("Quantity"), max_digits=18, decimal_places=8, default=0.0
    )
    average_price = models.DecimalField(
        _("Average Price"), max_digits=18, decimal_places=4, default=0.0
    )
    broker = models.CharField(_("Broker"), max_length=100, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Holding")
        verbose_name_plural = _("Holdings")
        unique_together = ("portfolio", "symbol")
        ordering = ["symbol"]

    def __str__(self):
        return f"{self.symbol} - {self.quantity} shares in {self.portfolio.name}"
