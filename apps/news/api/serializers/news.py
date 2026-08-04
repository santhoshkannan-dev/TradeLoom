from rest_framework import serializers
from apps.news.models.news_article import NewsArticle
from apps.news.models.news_sentiment import NewsSentiment


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = [
            "id",
            "title",
            "summary",
            "content",
            "source",
            "url",
            "published_at",
            "created_at",
            "updated_at",
        ]


class NewsSentimentSerializer(serializers.ModelSerializer):
    article = NewsArticleSerializer(read_only=True)

    class Meta:
        model = NewsSentiment
        fields = [
            "id",
            "article",
            "symbol",
            "sentiment",
            "confidence",
            "reason",
            "model_version",
            "created_at",
            "updated_at",
        ]


class TextSentimentAnalysisSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)
