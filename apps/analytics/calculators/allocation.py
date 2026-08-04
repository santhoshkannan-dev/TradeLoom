from collections import defaultdict


class AllocationCalculator:
    @staticmethod
    def calculate(holdings_with_prices):
        """
        Calculates allocation percentages across asset classes, sectors, brokers, and market caps.
        Expects a list of dicts with keys: symbol, asset_type, sector, broker, quantity, current_price, market_cap
        """
        asset_alloc = defaultdict(float)
        sector_alloc = defaultdict(float)
        broker_alloc = defaultdict(float)
        mcap_alloc = defaultdict(float)
        total_value = 0.0

        for h in holdings_with_prices:
            val = float(h.get("quantity", 0)) * float(h.get("current_price", 0))
            total_value += val

            asset_type = h.get("asset_type") or "Unknown"
            sector = h.get("sector") or "Unknown"
            broker = h.get("broker") or "Unknown"

            asset_alloc[asset_type] += val
            sector_alloc[sector] += val
            broker_alloc[broker] += val

            # Categorize market cap sizes
            mcap = h.get("market_cap")
            if mcap is not None:
                mcap = float(mcap)
                if mcap >= 1.5e10:  # 15 Billion
                    mcap_type = "Large Cap"
                elif mcap >= 2e9:  # 2 Billion
                    mcap_type = "Mid Cap"
                else:
                    mcap_type = "Small Cap"
            else:
                mcap_type = "Small Cap"
            mcap_alloc[mcap_type] += val

        def convert_to_percent(alloc_dict):
            if total_value == 0:
                return {}
            sorted_items = sorted(
                alloc_dict.items(), key=lambda x: x[1], reverse=True
            )
            return {
                k: round((v / total_value) * 100.0, 2)
                for k, v in sorted_items
            }

        return {
            "asset_allocation": convert_to_percent(asset_alloc),
            "sector_allocation": convert_to_percent(sector_alloc),
            "broker_allocation": convert_to_percent(broker_alloc),
            "market_cap_allocation": convert_to_percent(mcap_alloc),
        }
