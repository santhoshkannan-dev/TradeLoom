class RuleBasedSentimentEngine:
    def analyze(self, text):
        text = text.lower()
        positive_words = [
            "beat",
            "growth",
            "profit",
            "partnership",
            "gains",
            "up",
            "surges",
            "contract",
            "positive",
            "high",
            "upgrade",
            "win",
            "strong",
            "expansion",
            "bullish",
            "estimates",
        ]
        negative_words = [
            "miss",
            "decline",
            "loss",
            "slashed",
            "down",
            "falls",
            "negative",
            "low",
            "downgrade",
            "investigation",
            "plummets",
            "warning",
            "bearish",
            "deficit",
        ]

        pos_count = sum(1 for word in positive_words if word in text)
        neg_count = sum(1 for word in negative_words if word in text)

        if pos_count > neg_count:
            sentiment = "POSITIVE"
            confidence = 50.0 + min(50.0, (pos_count - neg_count) * 15.0)
            matched = [w for w in positive_words if w in text]
            reason = f"Matched positive signals: {', '.join(matched)}"
        elif neg_count > pos_count:
            sentiment = "NEGATIVE"
            confidence = 50.0 + min(50.0, (neg_count - pos_count) * 15.0)
            matched = [w for w in negative_words if w in text]
            reason = f"Matched negative signals: {', '.join(matched)}"
        else:
            sentiment = "NEUTRAL"
            confidence = 70.0
            reason = "No significant positive or negative signals detected."

        return {
            "sentiment": sentiment,
            "confidence": round(confidence, 2),
            "reason": reason,
            "model_version": "Rule-Based v1",
        }
