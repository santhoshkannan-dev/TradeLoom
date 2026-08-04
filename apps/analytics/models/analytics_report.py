from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel
from apps.portfolio.models.portfolio import Portfolio


class AnalyticsReport(BaseModel):
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="analytics_reports",
    )
    score = models.IntegerField(
        _("Health Score"),
        default=0,
    )
    summary = models.JSONField(
        _("Explainable Summary Factors"),
        default=dict,
        blank=True,
    )
    allocation = models.JSONField(
        _("Asset Allocation Metrics"),
        default=dict,
        blank=True,
    )
    risk = models.JSONField(
        _("Risk Metrics"),
        default=dict,
        blank=True,
    )
    performance = models.JSONField(
        _("Performance Indicators"),
        default=dict,
        blank=True,
    )
    generated_at = models.DateTimeField(
        _("Generated At"),
        default=timezone.now,
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("Analytics Report")
        verbose_name_plural = _("Analytics Reports")
        ordering = ["-generated_at"]

    def __str__(self):
        return f"{self.portfolio.name} - Score: {self.score} ({self.generated_at.strftime('%Y-%m-%d')})"
