from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel


class Portfolio(BaseModel):
    """
    Represents a user's investment portfolio.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="portfolios",
        verbose_name=_("User"),
    )

    name = models.CharField(
        _("Portfolio Name"),
        max_length=100,
    )

    description = models.TextField(
        _("Description"),
        blank=True,
    )

    base_currency = models.CharField(
        _("Base Currency"),
        max_length=10,
        default="INR",
    )

    class Meta(BaseModel.Meta):
        ordering = ["name"]
        verbose_name = _("Portfolio")
        verbose_name_plural = _("Portfolios")

    def __str__(self):
        return f"{self.user.email} - {self.name}"
