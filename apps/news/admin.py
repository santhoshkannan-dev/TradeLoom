from django.contrib import admin
from .models.news_article import NewsArticle
from .models.news_sentiment import NewsSentiment


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "source", "published_at")
    list_filter = ("source", "published_at")
    search_fields = ("title", "summary")
    ordering = ("-published_at",)


@admin.register(NewsSentiment)
class NewsSentimentAdmin(admin.ModelAdmin):
    list_display = ("symbol", "sentiment", "confidence", "model_version")
    list_filter = ("sentiment", "model_version")
    search_fields = ("symbol", "reason")
