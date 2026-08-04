import os
import json
from openai import OpenAI
from django.conf import settings


class LLMService:
    @staticmethod
    def get_advice(prompt, portfolio_context):
        """
        Sends the compiled prompt to OpenAI completions. If the API key is not configured,
        or calls timeout/fail, falls back to a deterministic rule-based advice generator.
        """
        api_key = os.environ.get("OPENAI_API_KEY")
        if api_key:
            try:
                client = OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are a professional financial portfolio advisor. "
                                "Return your response strictly in JSON matching: "
                                '{"summary": "...", "strengths": ["..."], '
                                '"concerns": ["..."], "suggestions": ["..."]}'
                            ),
                        },
                        {"role": "user", "content": prompt},
                    ],
                    response_format={"type": "json_object"},
                    timeout=15.0,
                )
                content = response.choices[0].message.content
                return json.loads(content)
            except Exception:
                pass

        # Fallback Rule-Based Advisor Logic using portfolio context
        value = portfolio_context.get("portfolio_value", 0.00)
        profit = portfolio_context.get("profit", 0.00)
        div_score = portfolio_context.get("diversification_score", 100)
        risk_score = portfolio_context.get("risk_score", 0)
        sectors = portfolio_context.get("sector_allocation", {})
        sentiments = portfolio_context.get("news_sentiment", [])

        summary = (
            f"Your portfolio has a total valuation of INR {value:,.2f} "
            f"with a profit of INR {profit:,.2f}."
        )
        if div_score >= 75:
            summary += " It is highly diversified with a well-balanced distribution."
        else:
            summary += " It has high concentration index risk indicating exposure to specific single stocks."

        strengths = []
        concerns = []
        suggestions = []

        if div_score >= 75:
            strengths.append("Well diversified across multiple assets.")
        else:
            concerns.append(
                "Concentration risk: Portfolio is concentrated in few holdings."
            )
            suggestions.append(
                "Trim large individual holdings to diversify your capital."
            )

        # Sector check
        max_sector = (
            max(sectors.items(), key=lambda x: x[1])
            if sectors
            else ("Cash", 100.0)
        )
        sec_name, sec_pct = max_sector
        if sec_pct > 40.0:
            concerns.append(
                f"High sector exposure: {sec_name} constitutes {sec_pct}% of holdings."
            )
            suggestions.append(
                f"Rebalance your portfolio by reallocating capital away from {sec_name} to other sectors."
            )
        else:
            strengths.append("Good sector allocation balance.")

        # News check
        neg_news = [
            item["symbol"]
            for item in sentiments
            if item["sentiment"] == "NEGATIVE"
        ]
        if neg_news:
            concerns.append(
                f"Negative news sentiment detected on symbols: {', '.join(neg_news)}."
            )
            suggestions.append(
                "Monitor news headlines closely for volatility updates on negative sentiment holdings."
            )
        else:
            strengths.append(
                "Positive or stable news sentiments for major active holdings."
            )

        if risk_score > 60:
            concerns.append("Portfolio volatility risk profile is relatively high.")
            suggestions.append(
                "Consider increasing cash or defensive asset allocations to lower beta swings."
            )

        if not suggestions:
            suggestions.append(
                "Maintain your current portfolio health allocations and check updates weekly."
            )

        return {
            "summary": summary,
            "strengths": strengths,
            "concerns": concerns,
            "suggestions": suggestions,
        }
