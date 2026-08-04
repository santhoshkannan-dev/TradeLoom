from decimal import Decimal
from apps.portfolio.models import Portfolio, Holding, Transaction
from apps.market.services.market_service import MarketService


class DashboardService:
    @staticmethod
    def get_dashboard(user):
        """
        Return complete dashboard statistics for all portfolios of a user.
        Calculations utilize cached Yahoo Finance market quotes.
        """
        portfolios = Portfolio.objects.filter(user=user)
        holdings = Holding.objects.filter(portfolio__in=portfolios)
        transactions = Transaction.objects.filter(holding__in=holdings).order_by(
            "-transaction_date", "-created_at"
        )[:10]

        total_investment = Decimal("0.00")
        current_value = Decimal("0.00")

        # Group allocations
        asset_values = {}
        sector_values = {}
        symbol_values = {}
        holdings_data = []

        for h in holdings:
            qty = h.quantity
            avg_price = h.average_price

            # Fetch current market price from MarketService cache
            try:
                quote = MarketService.get_quote(h.symbol)
                current_price = quote.current_price
                if current_price <= 0:
                    current_price = avg_price
            except Exception:
                current_price = avg_price

            val_investment = qty * avg_price
            val_current = qty * current_price

            total_investment += val_investment
            current_value += val_current

            holding_profit = val_current - val_investment

            holdings_data.append(
                {
                    "symbol": h.symbol,
                    "avg_price": round(avg_price, 2),
                    "current_price": round(current_price, 2),
                    "profit": round(holding_profit, 2),
                }
            )

            # Group allocations by current market value
            asset_type = h.get_asset_type_display()
            asset_values[asset_type] = (
                asset_values.get(asset_type, Decimal("0.00")) + val_current
            )

            sector = h.sector if h.sector else "Other"
            sector_values[sector] = (
                sector_values.get(sector, Decimal("0.00")) + val_current
            )

            symbol_values[h.symbol] = (
                symbol_values.get(h.symbol, Decimal("0.00")) + val_current
            )

        total_profit = current_value - total_investment
        profit_percentage = Decimal("0.00")
        if total_investment > 0:
            profit_percentage = (total_profit / total_investment) * Decimal("100.00")

        # Allocations
        asset_allocation = []
        sector_allocation = []
        if current_value > 0:
            for asset, val in asset_values.items():
                pct = (val / current_value) * Decimal("100.00")
                asset_allocation.append(
                    {
                        "asset": asset,
                        "percentage": round(pct, 2),
                        "value": round(val, 2),
                    }
                )
            for sector, val in sector_values.items():
                pct = (val / current_value) * Decimal("100.00")
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

        # Recent transactions representation
        recent_txs = []
        for tx in transactions:
            recent_txs.append(
                {
                    "id": str(tx.id),
                    "holding_symbol": tx.holding.symbol,
                    "transaction_type": tx.transaction_type,
                    "quantity": float(tx.quantity),
                    "price": float(tx.price),
                    "transaction_date": tx.transaction_date.isoformat(),
                }
            )

        return {
            "summary": {
                "total_investment": round(total_investment, 2),
                "current_value": round(current_value, 2),
                "profit": round(total_profit, 2),
                "profit_percentage": round(profit_percentage, 2),
                "total_holdings": holdings.count(),
                "total_transactions": Transaction.objects.filter(
                    holding__in=holdings
                ).count(),
            },
            "asset_allocation": asset_allocation,
            "sector_allocation": sector_allocation,
            "top_holdings": top_holdings,
            "recent_transactions": recent_txs,
            "holdings": holdings_data,
        }
