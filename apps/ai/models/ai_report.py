from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel
from apps.portfolio.models.portfolio import Portfolio


class AIAnalysisReport(BaseModel):
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name="ai_analysis_reports",
    )
    prompt_version = models.CharField(
        _("Prompt Version"),
        max_length=50,
        default="v1",
    )
    response = models.JSONField(
        _("AI Response Body"),
        default=dict,
        blank=True,
    )
    generated_at = models.DateTimeField(
        _("Generated At"),
        default=timezone.now,
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("AI Analysis Report")
        verbose_name_plural = _("AI Analysis Reports")
        ordering = ["-generated_at"]

    def __str__(self):
        return f"AI report: {self.portfolio.name} - Version: {self.prompt_version} ({self.generated_at.strftime('%Y-%m-%d')})"
