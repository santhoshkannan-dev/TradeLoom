import os
import json


class PromptBuilder:
    @staticmethod
    def _read_prompt_template(filename):
        base_dir = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(base_dir, "prompts", filename)
        with open(path, "r", encoding="utf-8") as f:
            return f.read()

    @staticmethod
    def build_advisor_prompt(portfolio_context):
        template = PromptBuilder._read_prompt_template("portfolio_advisor.txt")
        sectors = portfolio_context.get("sector_allocation", {})
        sectors_str = "\n".join(
            f"- {sec}: {pct}%" for sec, pct in sectors.items()
        )

        sentiment = portfolio_context.get("news_sentiment", [])
        sentiment_str = "\n".join(
            f"- {item['symbol']}: {item['sentiment']}" for item in sentiment
        )
        if not sentiment_str:
            sentiment_str = "No recent news sentiments available."

        return template.format(
            portfolio_value=portfolio_context.get("portfolio_value", 0.00),
            profit=portfolio_context.get("profit", 0.00),
            risk_score=portfolio_context.get("risk_score", 0),
            diversification_score=portfolio_context.get(
                "diversification_score", 0
            ),
            sector_allocation=sectors_str,
            news_sentiment=sentiment_str,
        )

    @staticmethod
    def build_market_summary_prompt(market_news):
        template = PromptBuilder._read_prompt_template("market_summary.txt")
        news_str = "\n".join(f"- {item}" for item in market_news)
        return template.format(market_news=news_str)

    @staticmethod
    def build_chatbot_prompt(portfolio_context, question):
        template = PromptBuilder._read_prompt_template("chatbot.txt")
        context_str = json.dumps(portfolio_context, indent=2)
        return template.format(
            portfolio_context=context_str, question=question
        )
