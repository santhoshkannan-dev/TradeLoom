from decimal import Decimal


class ReturnsCalculator:
    @staticmethod
    def calculate(holdings_with_prices):
        """
        Calculates total returns for the portfolio.
        Expects a list of dicts with keys: quantity, average_price, current_price
        """
        total_investment = Decimal("0.00")
        current_value = Decimal("0.00")

        for h in holdings_with_prices:
            qty = Decimal(str(h.get("quantity", 0)))
            avg_p = Decimal(str(h.get("average_price", 0)))
            curr_p = Decimal(str(h.get("current_price", 0)))

            total_investment += qty * avg_p
            current_value += qty * curr_p

        total_profit = current_value - total_investment
        total_return_percentage = Decimal("0.00")
        if total_investment > 0:
            total_return_percentage = (
                total_profit / total_investment
            ) * Decimal("100.00")

        return {
            "total_investment": round(float(total_investment), 2),
            "current_value": round(float(current_value), 2),
            "total_profit": round(float(total_profit), 2),
            "total_return_percentage": round(float(total_return_percentage), 2),
        }
