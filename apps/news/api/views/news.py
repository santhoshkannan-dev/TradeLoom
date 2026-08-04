from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from apps.portfolio.models.portfolio import Portfolio
from apps.news.models import NewsSentiment
from apps.news.api.serializers.news import (
    NewsSentimentSerializer,
    TextSentimentAnalysisSerializer,
)
from apps.news.services.news_service import NewsService
from apps.news.sentiment.service import SentimentService


class NewsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        sentiments = NewsSentiment.objects.all().order_by(
            "-article__published_at"
        )[:50]
        serializer = NewsSentimentSerializer(sentiments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CompanyNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, symbol, *args, **kwargs):
        sentiments = NewsService.get_company_news(symbol)
        serializer = NewsSentimentSerializer(sentiments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PortfolioNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        portfolio_id = request.query_params.get("portfolio_id")
        if not portfolio_id:
            raise ValidationError(
                {"portfolio_id": "This query parameter is required."}
            )

        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=request.user)
        except (Portfolio.DoesNotExist, ValueError):
            raise ValidationError(
                {
                    "portfolio_id": "Portfolio does not exist or does not belong to you."
                }
            )

        sentiments = NewsService.get_portfolio_news(portfolio)
        serializer = NewsSentimentSerializer(sentiments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnalyzeSentimentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TextSentimentAnalysisSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text = serializer.validated_data["text"]

        res = SentimentService.analyze_text(text)
        return Response(res, status=status.HTTP_200_OK)
