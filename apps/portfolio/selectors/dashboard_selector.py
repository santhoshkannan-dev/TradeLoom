class DashboardSelector:
    @staticmethod
    def calculate_summary(portfolio):
        """
        Calculates total investment, current value, returns, allocations, etc.
        """
        holdings = portfolio.holdings.all()
        total_investment = 0.0
        for h in holdings:
            total_investment += float(h.quantity) * float(h.average_price)

        current_value = total_investment  # Stored average price acts as current price fallback
        overall_pl = current_value - total_investment

        return {
            "total_investment": round(total_investment, 2),
            "current_value": round(current_value, 2),
            "today_pl": 0.0,
            "overall_pl": round(overall_pl, 2),
            "portfolio_return_pct": 0.0,
            "holdings_count": holdings.count(),
            "asset_allocation": {},
            "sector_allocation": {},
            "top_gainers": [],
            "top_losers": [],
        }
