class PerformanceCalculator:
    @staticmethod
    def calculate(holdings_with_prices):
        """
        Calculates high-level performance indicators for holdings.
        Expects a list of dicts with keys: symbol, quantity, average_price, current_price
        """
        if not holdings_with_prices:
            return {
                "best_performer": None,
                "worst_performer": None,
                "most_profitable": None,
                "largest_holding": None,
            }

        performers = []
        for h in holdings_with_prices:
            symbol = h["symbol"]
            qty = float(h.get("quantity", 0))
            avg_p = float(h.get("average_price", 0))
            curr_p = float(h.get("current_price", 0))

            val = qty * curr_p
            cost = qty * avg_p
            profit = val - cost
            pct_return = (
                ((curr_p - avg_p) / avg_p) * 100.0 if avg_p > 0 else 0.0
            )

            performers.append(
                {
                    "symbol": symbol,
                    "value": val,
                    "profit": profit,
                    "return_percentage": pct_return,
                }
            )

        best_perf = max(performers, key=lambda x: x["return_percentage"])
        worst_perf = min(performers, key=lambda x: x["return_percentage"])
        most_profit = max(performers, key=lambda x: x["profit"])
        largest_hold = max(performers, key=lambda x: x["value"])

        return {
            "best_performer": {
                "symbol": best_perf["symbol"],
                "return_percentage": round(best_perf["return_percentage"], 2),
            },
            "worst_performer": {
                "symbol": worst_perf["symbol"],
                "return_percentage": round(worst_perf["return_percentage"], 2),
            },
            "most_profitable": {
                "symbol": most_profit["symbol"],
                "profit": round(most_profit["profit"], 2),
            },
            "largest_holding": {
                "symbol": largest_hold["symbol"],
                "value": round(largest_hold["value"], 2),
            },
        }
