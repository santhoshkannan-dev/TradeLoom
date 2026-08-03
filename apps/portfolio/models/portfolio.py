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
    description = models.TextField(_("Description"), blank=True)
    base_currency = models.CharField(_("Base Currency"), max_length=10, default="INR")
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Portfolio")
        verbose_name_plural = _("Portfolios")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.user.email})"
