import math
from decimal import Decimal


class RiskCalculator:
    @staticmethod
    def calculate(holdings_with_prices, symbol_histories, benchmark_history=None):
        """
        Calculates daily returns, portfolio volatility, Sharpe ratio, Max Drawdown, Beta, and VaR.
        Expects:
        - holdings_with_prices: list of dicts with keys: symbol, quantity, current_price
        - symbol_histories: dict mapping symbol -> list of dicts with: date, close
        - benchmark_history: list of dicts with: date, close (or None)
        """
        total_value = 0.0
        weights = {}

        for h in holdings_with_prices:
            val = float(h.get("quantity", 0)) * float(h.get("current_price", 0))
            total_value += val
            weights[h["symbol"]] = val

        if total_value == 0:
            return {
                "volatility": 0.0,
                "sharpe_ratio": 0.0,
                "max_drawdown": 0.0,
                "beta": 1.0,
                "value_at_risk": 0.0,
                "expected_return": 0.0,
            }

        # Normalize weights
        for sym in weights:
            weights[sym] /= total_value

        # Calculate daily returns for each asset
        asset_returns = {}
        for sym, history in symbol_histories.items():
            if not history or len(history) < 2:
                continue
            # Sort history chronologically
            sorted_hist = sorted(history, key=lambda x: x["date"])
            returns_list = []
            for i in range(1, len(sorted_hist)):
                prev_close = float(sorted_hist[i - 1]["close"])
                curr_close = float(sorted_hist[i]["close"])
                if prev_close > 0:
                    ret = (curr_close - prev_close) / prev_close
                    returns_list.append(
                        {"date": sorted_hist[i]["date"], "return": ret}
                    )
            asset_returns[sym] = returns_list

        # Align daily returns by date
        all_dates = set()
        for returns in asset_returns.values():
            all_dates.update(item["date"] for item in returns)
        sorted_dates = sorted(list(all_dates))

        # Reconstruct daily returns of the portfolio
        portfolio_daily_returns = []
        for dt in sorted_dates:
            daily_ret = 0.0
            has_data = False
            for sym, weight in weights.items():
                returns = asset_returns.get(sym, [])
                # Find return for this date
                match = next((item for item in returns if item["date"] == dt), None)
                if match:
                    daily_ret += weight * match["return"]
                    has_data = True
            if has_data:
                portfolio_daily_returns.append(daily_ret)

        if not portfolio_daily_returns:
            return {
                "volatility": 0.0,
                "sharpe_ratio": 0.0,
                "max_drawdown": 0.0,
                "beta": 1.0,
                "value_at_risk": 0.0,
                "expected_return": 0.0,
            }

        # Standard stats
        n = len(portfolio_daily_returns)
        mean_daily = sum(portfolio_daily_returns) / n
        expected_return = mean_daily * 252.0  # Annualized Expected Return

        # Variance & Std Dev
        if n > 1:
            var_daily = sum((r - mean_daily) ** 2 for r in portfolio_daily_returns) / (
                n - 1
            )
            volatility = math.sqrt(var_daily * 252.0)
        else:
            volatility = 0.0

        # Sharpe ratio (assume risk-free rate of 5%)
        rf = 0.05
        if volatility > 0:
            sharpe_ratio = (expected_return - rf) / volatility
        else:
            sharpe_ratio = 0.0

        # Max Drawdown
        portfolio_value = 100.0
        portfolio_values = [portfolio_value]
        for r in portfolio_daily_returns:
            portfolio_value *= 1 + r
            portfolio_values.append(portfolio_value)

        max_drawdown = 0.0
        peak = -1.0
        for val in portfolio_values:
            if val > peak:
                peak = val
            drawdown = (peak - val) / peak if peak > 0 else 0.0
            if drawdown > max_drawdown:
                max_drawdown = drawdown

        # Value at Risk (VaR 95% confidence level)
        # 5th percentile of daily return
        sorted_rets = sorted(portfolio_daily_returns)
        pct_index = max(0, min(n - 1, int(math.floor(n * 0.05))))
        var_pct = sorted_rets[pct_index]
        value_at_risk = abs(var_pct) * total_value

        # Calculate Beta
        beta = 1.0
        if benchmark_history and len(benchmark_history) >= 2:
            sorted_bench = sorted(benchmark_history, key=lambda x: x["date"])
            bench_returns = []
            for i in range(1, len(sorted_bench)):
                prev = float(sorted_bench[i - 1]["close"])
                curr = float(sorted_bench[i]["close"])
                if prev > 0:
                    bench_returns.append(
                        {"date": sorted_bench[i]["date"], "return": (curr - prev) / prev}
                    )

            # Align portfolio returns and benchmark returns
            aligned_port = []
            aligned_bench = []
            for item in bench_returns:
                dt = item["date"]
                # Find aligned portfolio return
                port_ret_match = None
                # Calculate portfolio return for this specific date
                daily_ret = 0.0
                has_data = False
                for sym, weight in weights.items():
                    returns = asset_returns.get(sym, [])
                    match = next((r for r in returns if r["date"] == dt), None)
                    if match:
                        daily_ret += weight * match["return"]
                        has_data = True
                if has_data:
                    aligned_port.append(daily_ret)
                    aligned_bench.append(item["return"])

            if len(aligned_bench) > 1:
                mean_port = sum(aligned_port) / len(aligned_port)
                mean_bench = sum(aligned_bench) / len(aligned_bench)
                # Covariance
                cov = sum(
                    (aligned_port[i] - mean_port) * (aligned_bench[i] - mean_bench)
                    for i in range(len(aligned_bench))
                ) / (len(aligned_bench) - 1)
                # Benchmark Variance
                var_bench = sum((r - mean_bench) ** 2 for r in aligned_bench) / (
                    len(aligned_bench) - 1
                )
                if var_bench > 0:
                    beta = cov / var_bench

        return {
            "volatility": round(volatility, 4),
            "sharpe_ratio": round(sharpe_ratio, 4),
            "max_drawdown": round(max_drawdown, 4),
            "beta": round(beta, 4),
            "value_at_risk": round(value_at_risk, 2),
            "expected_return": round(expected_return, 4),
        }
