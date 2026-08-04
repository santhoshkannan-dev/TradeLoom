from decimal import Decimal
from django.utils import timezone
from apps.portfolio.models import Holding
from apps.market.services.market_service import MarketService
from apps.analytics.models.analytics_report import AnalyticsReport
from apps.analytics.calculators.returns import ReturnsCalculator
from apps.analytics.calculators.allocation import AllocationCalculator
from apps.analytics.calculators.diversification import DiversificationCalculator
from apps.analytics.calculators.risk import RiskCalculator
from apps.analytics.calculators.performance import PerformanceCalculator


class AnalyticsService:
    @staticmethod
    def generate_report(portfolio):
        """
        Gathers holdings and historical pricing details, computes portfolio return, risk,
        allocations, and health scoring metrics, and persists the generated report.
        """
        holdings = Holding.objects.filter(portfolio=portfolio)
        if not holdings.exists():
            return None

        # Build list of holdings with pricing
        holdings_with_prices = []
        symbol_histories = {}
        for h in holdings:
            qty = float(h.quantity)
            avg_price = float(h.average_price)
            if qty <= 0:
                continue

            current_price = avg_price
            market_cap = None
            try:
                quote = MarketService.get_quote(h.symbol)
                current_price = float(quote.current_price)
                if current_price <= 0:
                    current_price = avg_price
                market_cap = (
                    float(quote.market_cap) if quote.market_cap else None
                )
            except Exception:
                pass

            holdings_with_prices.append(
                {
                    "symbol": h.symbol,
                    "asset_type": h.asset_type,
                    "sector": h.sector,
                    "broker": h.broker,
                    "quantity": qty,
                    "average_price": avg_price,
                    "current_price": current_price,
                    "market_cap": market_cap,
                }
            )

            # Fetch daily histories
            try:
                hist = MarketService.get_historical_prices(h.symbol, period="3mo")
                symbol_histories[h.symbol] = hist
            except Exception:
                symbol_histories[h.symbol] = []

        if not holdings_with_prices:
            return None

        # Fetch benchmark history (Nifty 50 or S&P 500)
        benchmark_history = []
        try:
            benchmark_history = MarketService.get_historical_prices(
                "^NSEI", period="3mo"
            )
        except Exception:
            pass

        # 1. Run calculators
        returns = ReturnsCalculator.calculate(holdings_with_prices)
        allocations = AllocationCalculator.calculate(holdings_with_prices)
        diversification = DiversificationCalculator.calculate(
            holdings_with_prices
        )
        risk = RiskCalculator.calculate(
            holdings_with_prices, symbol_histories, benchmark_history
        )
        performance = PerformanceCalculator.calculate(holdings_with_prices)

        # 2. Compute Explainable Portfolio Health Score
        div_score = float(diversification["diversification_score"])  # 30%

        # Volatility Score (lower is better, standard volatility around 15% or 0.15)
        vol = risk.get("volatility", 0.0)
        vol_score = max(0, min(100, 100 - (vol * 200.0)))  # 20%

        # Sharpe ratio (higher is better)
        sharpe = risk.get("sharpe_ratio", 0.0)
        sharpe_score = max(0, min(100, sharpe * 50.0 if sharpe > 0 else 0.0))  # 20%

        # Sector Balance
        sec_alloc = allocations["sector_allocation"]
        max_sector_pct = list(sec_alloc.values())[0] if sec_alloc else 100.0
        sector_score = max(0, min(100, 100 - (max_sector_pct - 20.0) * 1.5))  # 15%

        # Small Cap Allocation
        small_cap_pct = allocations["market_cap_allocation"].get(
            "Small Cap", 0.0
        )
        mcap_score = max(
            0,
            min(
                100,
                100 - (small_cap_pct - 30.0) * 2.0
                if small_cap_pct > 30.0
                else 100.0,
            ),
        )  # 15%

        health_score = int(
            round(
                (div_score * 0.30)
                + (vol_score * 0.20)
                + (sharpe_score * 0.20)
                + (sector_score * 0.15)
                + (mcap_score * 0.15)
            )
        )
        health_score = max(0, min(100, health_score))

        # 3. Build Strengths & Weaknesses
        strengths = []
        weaknesses = []

        if div_score >= 75:
            strengths.append("Well diversified across multiple holdings.")
        if vol < 0.15:
            strengths.append("Stable returns with low overall portfolio volatility.")
        if sharpe >= 1.5:
            strengths.append(
                "Excellent risk-adjusted returns (high Sharpe ratio)."
            )
        if max_sector_pct <= 30.0:
            strengths.append("Good sector balance with low concentration risk.")

        if div_score < 50:
            weaknesses.append(
                "High concentration risk: Portfolio is concentrated in few holdings."
            )
        if vol >= 0.30:
            weaknesses.append(
                "High volatility: Portfolio is subject to significant price swings."
            )
        if max_sector_pct > 40.0:
            weaknesses.append("Sector concentration high: Vested heavily in single sector.")
        if small_cap_pct > 50.0:
            weaknesses.append("Excessive small-cap exposure: Highly volatile market caps.")

        summary_factors = {
            "strengths": strengths,
            "weaknesses": weaknesses,
        }

        # 4. Save report after sanitizing NaN/Inf values
        import math
        def sanitize_json(data):
            if isinstance(data, dict):
                return {k: sanitize_json(v) for k, v in data.items()}
            elif isinstance(data, list):
                return [sanitize_json(v) for v in data]
            elif isinstance(data, float):
                if math.isnan(data) or math.isinf(data):
                    return 0.0
            return data

        risk = sanitize_json(risk)
        performance = sanitize_json(performance)

        report = AnalyticsReport.objects.create(
            portfolio=portfolio,
            score=health_score,
            summary=summary_factors,
            allocation=allocations,
            risk=risk,
            performance=performance,
        )

        return report
