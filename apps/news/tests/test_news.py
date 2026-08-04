import pytest
from decimal import Decimal
from unittest.mock import patch, MagicMock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone
from apps.users.tests.factories import UserFactory
from apps.portfolio.models import Portfolio, Holding
from apps.news.models import NewsArticle, NewsSentiment
from apps.news.sentiment.rule_based import RuleBasedSentimentEngine
from apps.news.sentiment.finbert import FinBERTSentimentEngine
from apps.news.services.news_service import NewsService
from apps.news.tasks import update_financial_news

pytestmark = pytest.mark.django_db


class TestNewsSentimentEngine:
    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    def test_rule_based_sentiment_positive(self):
        engine = RuleBasedSentimentEngine()
        res = engine.analyze(
            "Infosys reports strong quarterly earnings beat and revenue growth."
        )
        assert res["sentiment"] == "POSITIVE"
        assert res["confidence"] > 50.0
        assert "beat" in res["reason"] or "growth" in res["reason"]

    def test_rule_based_sentiment_negative(self):
        engine = RuleBasedSentimentEngine()
        res = engine.analyze(
            "Reliance shares plummets and registers sharp decline and losses."
        )
        assert res["sentiment"] == "NEGATIVE"
        assert res["confidence"] > 50.0
        assert "decline" in res["reason"] or "loss" in res["reason"]

    def test_finbert_sentiment_fallback(self):
        engine = FinBERTSentimentEngine()
        res = engine.analyze("Infosys signs contract partnership.")
        assert res["sentiment"] == "POSITIVE"
        assert res["model_version"] == "FinBERT v1 (Fallback)"

    @patch("apps.news.providers.yahoo.YahooNewsProvider.fetch_company_news")
    @patch("apps.news.providers.yahoo.YahooNewsProvider.fetch_market_news")
    def test_news_service_sync_and_mapping(
        self, mock_market, mock_company, user_a
    ):
        portfolio = Portfolio.objects.create(user=user_a, name="News Portfolio")
        Holding.objects.create(
            portfolio=portfolio,
            symbol="INFY",
            company_name="Infosys",
            exchange="NSE",
            asset_type="STOCK",
            quantity=Decimal("10.0"),
            average_price=Decimal("1500.0"),
            broker="ZERODHA",
        )

        mock_market.return_value = []
        mock_company.return_value = [
            {
                "title": "Infosys quarterly earnings beat forecasts.",
                "summary": "Infosys has reported stellar growth numbers.",
                "url": "https://example.com/infy-news",
                "published_at": timezone.now(),
                "source": "Mock Publisher",
            }
        ]

        count = NewsService.sync_news(symbols=["INFY"])
        assert count == 1

        article = NewsArticle.objects.get(url="https://example.com/infy-news")
        assert article.title == "Infosys quarterly earnings beat forecasts."

        sentiment = NewsSentiment.objects.get(article=article, symbol="INFY")
        assert sentiment.sentiment == "POSITIVE"
        assert float(sentiment.confidence) > 50.0

    @patch("apps.news.providers.yahoo.YahooNewsProvider.fetch_company_news")
    @patch("apps.news.providers.yahoo.YahooNewsProvider.fetch_market_news")
    def test_news_api_endpoints(
        self, mock_market, mock_company, auth_client_a, user_a
    ):
        portfolio = Portfolio.objects.create(user=user_a, name="News Portfolio")
        Holding.objects.create(
            portfolio=portfolio,
            symbol="INFY",
            company_name="Infosys",
            exchange="NSE",
            asset_type="STOCK",
            quantity=Decimal("10.0"),
            average_price=Decimal("1500.0"),
            broker="ZERODHA",
        )

        mock_market.return_value = []
        mock_company.return_value = [
            {
                "title": "Infosys signs contract partnership.",
                "summary": "Infosys shares details of strategic alliance.",
                "url": "https://example.com/infy-partnership",
                "published_at": timezone.now(),
                "source": "Mock Publisher",
            }
        ]

        NewsService.sync_news(symbols=["INFY"])

        list_url = reverse("api:news:list")
        response = auth_client_a.get(list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

        company_url = reverse("api:news:company", args=["INFY"])
        response = auth_client_a.get(company_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

        portfolio_url = reverse("api:news:portfolio")
        response = auth_client_a.get(
            portfolio_url, {"portfolio_id": portfolio.id}
        )
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

        analyze_url = reverse("api:news:analyze")
        response = auth_client_a.post(
            analyze_url, {"text": "Company falls below average estimates."}
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["sentiment"] == "NEGATIVE"

    @patch("apps.news.services.news_service.NewsService.sync_news")
    def test_celery_task_news_update(self, mock_sync):
        mock_sync.return_value = 5
        res = update_financial_news()
        assert "Synchronized 5 news articles" in res
        assert mock_sync.called
