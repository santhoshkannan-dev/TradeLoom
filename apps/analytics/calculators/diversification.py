class DiversificationCalculator:
    @staticmethod
    def calculate(holdings_with_prices):
        """
        Calculates diversification score (0-100) based on Herfindahl-Hirschman Index (HHI).
        Expects a list of dicts with keys: symbol, quantity, current_price, sector
        """
        weights = {}
        sector_weights = {}
        total_value = 0.0

        for h in holdings_with_prices:
            val = float(h.get("quantity", 0)) * float(h.get("current_price", 0))
            total_value += val
            weights[h["symbol"]] = val
            s = h.get("sector") or "Unknown"
            sector_weights[s] = sector_weights.get(s, 0.0) + val

        if total_value == 0:
            return {
                "diversification_score": 0,
                "hhi": 1.0,
                "reasons": ["Portfolio has no holdings."],
            }

        # Normalize weights and calculate HHI
        hhi = 0.0
        stock_percentages = {}
        for symbol, val in weights.items():
            w = val / total_value
            hhi += w**2
            stock_percentages[symbol] = round(w * 100.0, 2)

        diversification_score = round(100.0 * (1.0 - hhi))
        diversification_score = max(0, min(100, diversification_score))

        reasons = []
        max_sector = max(sector_weights.items(), key=lambda x: x[1])
        max_sector_name, max_sector_val = max_sector
        max_sector_pct = (max_sector_val / total_value) * 100.0
        if max_sector_pct > 40.0:
            reasons.append(
                f"Too much exposure to {max_sector_name} sector ({max_sector_pct:.1f}%)."
            )

        max_stock = max(stock_percentages.items(), key=lambda x: x[1])
        max_stock_name, max_stock_pct = max_stock
        if max_stock_pct > 30.0:
            reasons.append(
                f"Single stock concentration high: {max_stock_name} represents {max_stock_pct:.1f}% of portfolio."
            )

        if diversification_score >= 80:
            msg = "Well diversified"
        elif diversification_score >= 50:
            msg = "Moderately diversified"
        else:
            msg = "Highly concentrated"
        reasons.insert(0, msg)

        return {
            "diversification_score": int(diversification_score),
            "hhi": round(float(hhi), 4),
            "stock_percentages": stock_percentages,
            "reasons": reasons,
        }
