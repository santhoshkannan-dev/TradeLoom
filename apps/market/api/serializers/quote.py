from rest_framework import serializers
from apps.market.models.quote import MarketQuote


class MarketQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketQuote
        fields = [
            "symbol",
            "current_price",
            "previous_close",
            "change",
            "change_percent",
            "volume",
            "market_cap",
            "updated_at",
        ]
