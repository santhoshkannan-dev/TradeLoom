from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from common.models import BaseModel
from common.constants.choices import Broker


class BrokerAccount(BaseModel):
    class ConnectionStatus(models.TextChoices):
        CONNECTED = "CONNECTED", "Connected"
        DISCONNECTED = "DISCONNECTED", "Disconnected"
        EXPIRED = "EXPIRED", "Expired"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="broker_accounts",
    )
    broker_name = models.CharField(
        _("Broker Name"),
        max_length=50,
        choices=Broker.choices,
        default=Broker.MANUAL,
    )
    account_id = models.CharField(
        _("Account ID"),
        max_length=100,
        blank=True,
    )
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=ConnectionStatus.choices,
        default=ConnectionStatus.CONNECTED,
    )
    access_token = models.TextField(
        _("Access Token"),
        blank=True,
    )
    refresh_token = models.TextField(
        _("Refresh Token"),
        blank=True,
    )
    connected_at = models.DateTimeField(
        _("Connected At"),
        default=timezone.now,
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("Broker Account")
        verbose_name_plural = _("Broker Accounts")
        ordering = ["-connected_at"]

    def __str__(self):
        return f"{self.user.email} - {self.broker_name}"
