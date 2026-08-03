import uuid
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


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
