from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from common.models import BaseModel
from common.constants.choices import Broker
from apps.portfolio.models.portfolio import Portfolio


class ImportJob(BaseModel):
    class JobStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        RUNNING = "RUNNING", "Running"
        COMPLETED = "COMPLETED", "Completed"
        FAILED = "FAILED", "Failed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="import_jobs",
    )
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="import_jobs",
    )
    broker = models.CharField(
        _("Broker"),
        max_length=50,
        choices=Broker.choices,
    )
    file_name = models.CharField(
        _("File Name"),
        max_length=255,
    )
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=JobStatus.choices,
        default=JobStatus.PENDING,
    )
    imported_records = models.IntegerField(
        _("Imported Records"),
        default=0,
    )
    failed_records = models.IntegerField(
        _("Failed Records"),
        default=0,
    )
    started_at = models.DateTimeField(
        _("Started At"),
        null=True,
        blank=True,
    )
    finished_at = models.DateTimeField(
        _("Finished At"),
        null=True,
        blank=True,
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("Import Job")
        verbose_name_plural = _("Import Jobs")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.broker} - {self.file_name} ({self.status})"
