from rest_framework import serializers
from apps.portfolio.models.watchlist import Watchlist


class WatchlistSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    current_price = serializers.SerializerMethodField()
    is_target_reached = serializers.SerializerMethodField()

    class Meta:
        model = Watchlist
        fields = [
            "id",
            "user",
            "symbol",
            "target_price",
            "current_price",
            "is_target_reached",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate(self, attrs):
        target_price = attrs.get("target_price")
        if target_price is not None and target_price < 0.0:
            raise serializers.ValidationError(
                {"target_price": "Target price cannot be negative."}
            )
        return attrs

    def get_current_price(self, obj) -> float:
        from apps.market.services.market_service import MarketService

        try:
            quote = MarketService.get_quote(obj.symbol)
            return float(quote.current_price)
        except Exception:
            return 0.0

    def get_is_target_reached(self, obj) -> bool:
        if obj.target_price is None:
            return False
        current = self.get_current_price(obj)
        return current >= float(obj.target_price)
