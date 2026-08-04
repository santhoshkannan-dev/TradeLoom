from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import BaseModel
from .news_article import NewsArticle


class NewsSentiment(BaseModel):
    class SentimentClass(models.TextChoices):
        POSITIVE = "POSITIVE", "Positive"
        NEGATIVE = "NEGATIVE", "Negative"
        NEUTRAL = "NEUTRAL", "Neutral"

    article = models.ForeignKey(
        NewsArticle,
        on_delete=models.CASCADE,
        related_name="sentiments",
    )
    symbol = models.CharField(
        _("Stock Symbol"),
        max_length=20,
        db_index=True,
    )
    sentiment = models.CharField(
        _("Sentiment"),
        max_length=20,
        choices=SentimentClass.choices,
        default=SentimentClass.NEUTRAL,
    )
    confidence = models.DecimalField(
        _("Confidence Score"),
        max_digits=5,
        decimal_places=2,
        default=0.00,
    )
    reason = models.TextField(
        _("Reason"),
        blank=True,
    )
    model_version = models.CharField(
        _("Model Version"),
        max_length=50,
        default="Rule-Based v1",
    )

    class Meta(BaseModel.Meta):
        verbose_name = _("News Sentiment")
        verbose_name_plural = _("News Sentiments")
        unique_together = ("article", "symbol")

    def __str__(self):
        return f"{self.symbol}: {self.sentiment} ({self.confidence}%)"
