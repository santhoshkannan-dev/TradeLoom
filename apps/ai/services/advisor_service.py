from django.utils import timezone
from apps.portfolio.models.portfolio import Portfolio
from apps.portfolio.models.holding import Holding
from apps.market.models.quote import MarketQuote
from apps.analytics.services.analytics_service import AnalyticsService
from apps.analytics.calculators.returns import ReturnsCalculator
from apps.analytics.calculators.diversification import DiversificationCalculator
from apps.news.services.news_service import NewsService
from apps.ai.models.ai_report import AIAnalysisReport
from .prompt_builder import PromptBuilder
from .llm_service import LLMService


class AdvisorService:
    @staticmethod
    def generate_portfolio_context(portfolio):
        """
        Gathers portfolio holdings, market prices, analytics,
        and news sentiments to build the structured LLM Portfolio Context.
        """
        holdings = Holding.objects.filter(portfolio=portfolio, quantity__gt=0)
        holdings_with_prices = []
        for h in holdings:
            try:
                quote = MarketQuote.objects.get(symbol=h.symbol)
                current_price = float(quote.current_price)
                market_cap = (
                    float(quote.market_cap)
                    if quote.market_cap is not None
                    else None
                )
            except MarketQuote.DoesNotExist:
                current_price = float(h.average_price)
                market_cap = None

            holdings_with_prices.append(
                {
                    "symbol": h.symbol,
                    "quantity": float(h.quantity),
                    "average_price": float(h.average_price),
                    "current_price": current_price,
                    "sector": h.sector or "Unknown",
                    "broker": h.broker or "Unknown",
                    "market_cap": market_cap,
                }
            )

        if not holdings_with_prices:
            return {
                "portfolio_value": 0.00,
                "profit": 0.00,
                "risk_score": 0,
                "diversification_score": 0,
                "sector_allocation": {},
                "top_holdings": [],
                "news_sentiment": [],
            }

        returns = ReturnsCalculator.calculate(holdings_with_prices)
        div = DiversificationCalculator.calculate(holdings_with_prices)

        # Get or generate analytics report
        report = getattr(portfolio, "analyticsreport", None)
        if not report:
            try:
                report = AnalyticsService.generate_report(portfolio)
            except Exception:
                report = None

        volatility = 0.15
        sectors = {}
        if report:
            volatility = report.risk.get("volatility", 0.15)
            sectors = report.allocation.get("sector_allocation", {})
        else:
            for h in holdings_with_prices:
                sect = h["sector"]
                val = h["quantity"] * h["current_price"]
                sectors[sect] = sectors.get(sect, 0.0) + val
            tot_val = returns["current_value"]
            if tot_val > 0:
                sectors = {
                    k: round((v / tot_val) * 100.0, 2)
                    for k, v in sectors.items()
                }

        top_holdings = sorted(
            holdings_with_prices,
            key=lambda x: x["quantity"] * x["current_price"],
            reverse=True,
        )
        top_symbols = [x["symbol"] for x in top_holdings[:3]]

        news = NewsService.get_portfolio_news(portfolio)
        news_sentiment = [
            {
                "symbol": ns.symbol,
                "sentiment": ns.sentiment,
            }
            for ns in news[:10]
        ]

        return {
            "portfolio_value": round(float(returns["current_value"]), 2),
            "profit": round(float(returns["total_profit"]), 2),
            "risk_score": int(round(volatility * 100)),
            "diversification_score": int(
                round(div.get("diversification_score", 100.0))
            ),
            "sector_allocation": sectors,
            "top_holdings": top_symbols,
            "news_sentiment": news_sentiment,
        }

    @staticmethod
    def get_portfolio_advice(portfolio):
        """
        Compiles context, calls LLM, saves report log in DB, and returns response.
        """
        context = AdvisorService.generate_portfolio_context(portfolio)
        prompt = PromptBuilder.build_advisor_prompt(context)
        response = LLMService.get_advice(prompt, context)

        AIAnalysisReport.objects.create(
            portfolio=portfolio,
            prompt_version="v1",
            response=response,
            generated_at=timezone.now(),
        )

        return response
