from rest_framework import serializers
from apps.portfolio.models.holding import Holding


class HoldingSerializer(serializers.ModelSerializer):
    current_price = serializers.SerializerMethodField()
    market_value = serializers.SerializerMethodField()
    total_gain_loss = serializers.SerializerMethodField()
    total_gain_loss_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Holding
        fields = [
            "id",
            "portfolio",
            "symbol",
            "company_name",
            "exchange",
            "asset_type",
            "sector",
            "industry",
            "quantity",
            "average_price",
            "current_price",
            "broker",
            "market_value",
            "total_gain_loss",
            "total_gain_loss_percentage",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "quantity",
            "average_price",
            "created_at",
            "updated_at",
        ]

    def validate_portfolio(self, value):
        # Verify the portfolio belongs to the current user
        request = self.context.get("request")
        if request and value.user != request.user:
            raise serializers.ValidationError(
                "You can only associate holdings with your own portfolios."
            )
        return value

    def get_current_price(self, obj) -> float:
        return float(obj.average_price)

    def get_market_value(self, obj) -> float:
        price = self.get_current_price(obj)
        return round(float(obj.quantity) * price, 4)

    def get_total_gain_loss(self, obj) -> float:
        return 0.0

    def get_total_gain_loss_percentage(self, obj) -> float:
        return 0.0
