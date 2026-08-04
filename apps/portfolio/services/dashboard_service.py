from decimal import Decimal
from apps.portfolio.models import Portfolio, Holding, Transaction


class DashboardService:
    @staticmethod
    def get_dashboard(user):
        """
        Return complete dashboard statistics for all portfolios of a user.
        """
        portfolios = Portfolio.objects.filter(user=user)
        holdings = Holding.objects.filter(portfolio__in=portfolios)
        transactions = Transaction.objects.filter(holding__in=holdings)

        total_investment = Decimal("0.00")
        current_value = Decimal("0.00")

        # Group allocations
        asset_values = {}
        sector_values = {}
        symbol_values = {}

        for h in holdings:
            val = h.quantity * h.average_price
            total_investment += val
            current_value += val  # Fallback to average price for current price for now

            # Grouping by asset type
            asset_type = h.get_asset_type_display()
            asset_values[asset_type] = (
                asset_values.get(asset_type, Decimal("0.00")) + val
            )

            # Grouping by sector
            sector = h.sector if h.sector else "Other"
            sector_values[sector] = (
                sector_values.get(sector, Decimal("0.00")) + val
            )

            # Grouping by symbol
            symbol_values[h.symbol] = (
                symbol_values.get(h.symbol, Decimal("0.00")) + val
            )

        total_profit = current_value - total_investment
        profit_percentage = Decimal("0.00")
        if total_investment > 0:
            profit_percentage = (total_profit / total_investment) * Decimal("100.00")

        # Allocations with percentages
        asset_allocation = []
        sector_allocation = []
        if total_investment > 0:
            for asset, val in asset_values.items():
                pct = (val / total_investment) * Decimal("100.00")
                asset_allocation.append(
                    {
                        "asset": asset,
                        "percentage": round(pct, 2),
                        "value": round(val, 2),
                    }
                )
            for sector, val in sector_values.items():
                pct = (val / total_investment) * Decimal("100.00")
                sector_allocation.append(
                    {
                        "sector": sector,
                        "percentage": round(pct, 2),
                        "value": round(val, 2),
                    }
                )

        # Top holdings sorted by value descending
        top_holdings = []
        for symbol, val in symbol_values.items():
            top_holdings.append(
                {
                    "symbol": symbol,
                    "value": round(val, 2),
                }
            )
        top_holdings.sort(key=lambda x: x["value"], reverse=True)

        return {
            "total_investment": round(total_investment, 2),
            "current_value": round(current_value, 2),
            "total_profit": round(total_profit, 2),
            "profit_percentage": round(profit_percentage, 2),
            "total_holdings": holdings.count(),
            "total_transactions": transactions.count(),
            "asset_allocation": asset_allocation,
            "sector_allocation": sector_allocation,
            "top_holdings": top_holdings,
        }
