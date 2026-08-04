import pytest
from decimal import Decimal
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.users.tests.factories import UserFactory
from apps.portfolio.models import Portfolio, Holding
from apps.market.models.quote import MarketQuote
from apps.ai.models.ai_report import AIAnalysisReport
from apps.ai.services.prompt_builder import PromptBuilder
from apps.ai.services.llm_service import LLMService
from apps.ai.services.advisor_service import AdvisorService

pytestmark = pytest.mark.django_db


class TestAIPortfolioAdvisor:
    @pytest.fixture
    def user_a(self):
        return UserFactory.create()

    @pytest.fixture
    def auth_client_a(self, user_a):
        client = APIClient()
        client.force_authenticate(user=user_a)
        return client

    def test_prompt_builder(self):
        context = {
            "portfolio_value": 100000.0,
            "profit": 5000.0,
            "risk_score": 45,
            "diversification_score": 85,
            "sector_allocation": {"IT": 35.0, "Banking": 65.0},
            "news_sentiment": [{"symbol": "INFY", "sentiment": "POSITIVE"}],
        }
        prompt = PromptBuilder.build_advisor_prompt(context)
        assert "100000" in prompt
        assert "Banking" in prompt
        assert "INFY" in prompt

        cb_prompt = PromptBuilder.build_chatbot_prompt(
            context, "How is my portfolio doing?"
        )
        assert "How is my portfolio doing?" in cb_prompt

    def test_llm_service_fallback(self):
        context = {
            "portfolio_value": 1500000.00,
            "profit": 200000.00,
            "risk_score": 35,
            "diversification_score": 40,
            "sector_allocation": {"IT": 75.0, "Banking": 25.0},
            "news_sentiment": [{"symbol": "INFY", "sentiment": "NEGATIVE"}],
        }
        advice = LLMService.get_advice("dummy prompt", context)
        assert "summary" in advice
        assert len(advice["concerns"]) > 0
        assert any("Concentration risk" in c for c in advice["concerns"])
        assert any("IT constitutes 75" in c for c in advice["concerns"])
        assert any(
            "NEGATIVE" in c or "Negative news" in c for c in advice["concerns"]
        )

    def test_advisor_service_empty_portfolio(self, user_a):
        portfolio = Portfolio.objects.create(
            user=user_a, name="Empty Portfolio"
        )
        context = AdvisorService.generate_portfolio_context(portfolio)
        assert context["portfolio_value"] == 0.0
        assert context["top_holdings"] == []

        advice = AdvisorService.get_portfolio_advice(portfolio)
        assert "summary" in advice
        assert (
            AIAnalysisReport.objects.filter(portfolio=portfolio).count() == 1
        )

    def test_advisor_service_single_holding(self, user_a):
        portfolio = Portfolio.objects.create(
            user=user_a, name="Single Portfolio"
        )
        Holding.objects.create(
            portfolio=portfolio,
            symbol="TCS",
            company_name="Tata Consultancy",
            exchange="NSE",
            asset_type="STOCK",
            quantity=Decimal("10.0"),
            average_price=Decimal("3000.0"),
            broker="GROWW",
            sector="IT",
        )
        MarketQuote.objects.create(
            symbol="TCS",
            current_price=Decimal("3500.00"),
            change=Decimal("500.0"),
            change_percent=Decimal("16.67"),
            volume=100000,
        )

        context = AdvisorService.generate_portfolio_context(portfolio)
        assert context["portfolio_value"] == 35000.0
        assert context["top_holdings"] == ["TCS"]

        advice = AdvisorService.get_portfolio_advice(portfolio)
        assert any("Concentration risk" in c for c in advice["concerns"])

    def test_ai_advisor_api_endpoints(self, auth_client_a, user_a):
        portfolio = Portfolio.objects.create(user=user_a, name="API Portfolio")
        Holding.objects.create(
            portfolio=portfolio,
            symbol="INFY",
            company_name="Infosys",
            exchange="NSE",
            asset_type="STOCK",
            quantity=Decimal("20.0"),
            average_price=Decimal("1500.0"),
            broker="ZERODHA",
            sector="IT",
        )
        MarketQuote.objects.create(
            symbol="INFY",
            current_price=Decimal("1600.00"),
            change=Decimal("100.0"),
            change_percent=Decimal("6.67"),
            volume=50000,
        )

        advisor_url = reverse("api:ai:advisor")
        response = auth_client_a.post(
            advisor_url, {"portfolio_id": str(portfolio.id)}
        )
        assert response.status_code == status.HTTP_200_OK
        assert "summary" in response.data

        reports_url = reverse("api:ai:reports-list")
        response = auth_client_a.get(reports_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["portfolio"] == portfolio.id
