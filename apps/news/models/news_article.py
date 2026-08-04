from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel


class NewsArticle(BaseModel):
    title = models.CharField(
        _("Title"),
        max_length=500,
    )
    summary = models.TextField(
        _("Summary"),
        blank=True,
    )
    content = models.TextField(
        _("Content"),
        blank=True,
    )
    source = models.CharField(
        _("Source"),
        max_length=100,
    )
    url = models.URLField(
        _("URL"),
        max_length=500,
        unique=True,
    )
    published_at = models.DateTimeField(
        _("Published At"),
        default=timezone.now,
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("News Article")
        verbose_name_plural = _("News Articles")
        ordering = ["-published_at"]

    def __str__(self):
        return self.title
