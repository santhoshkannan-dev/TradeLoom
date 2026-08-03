from rest_framework import serializers
from apps.portfolio.models.watchlist import Watchlist


class WatchlistSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Watchlist
        fields = [
            "id",
            "user",
            "symbol",
            "target_price",
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
