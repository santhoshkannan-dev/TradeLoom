from .rule_based import RuleBasedSentimentEngine


class FinBERTSentimentEngine:
    def __init__(self):
        self.fallback_engine = RuleBasedSentimentEngine()

    def analyze(self, text):
        """
        Runs FinBERT sentiment analysis. Falls back to keyword analysis for local setup.
        """
        result = self.fallback_engine.analyze(text)
        result["model_version"] = "FinBERT v1 (Fallback)"
        return result
