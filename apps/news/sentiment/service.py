from .finbert import FinBERTSentimentEngine


class SentimentService:
    _engine = FinBERTSentimentEngine()

    @classmethod
    def set_engine(cls, engine):
        cls._engine = engine

    @classmethod
    def analyze_text(cls, text):
        return cls._engine.analyze(text)
