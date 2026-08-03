from rest_framework import serializers
from apps.portfolio.models import Portfolio, Holding, Transaction, Watchlist


class PortfolioSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    holdings_count = serializers.IntegerField(source="holdings.count", read_only=True)
    total_value = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "user",
            "name",
            "holdings_count",
            "total_value",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_total_value(self, obj) -> float:
        total = 0.0
        for holding in obj.holdings.all():
            price = holding.current_price or holding.average_price or 0.0
            total += float(holding.quantity) * float(price)
        return round(total, 4)


class HoldingSerializer(serializers.ModelSerializer):
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
            "quantity",
            "average_price",
            "current_price",
            "sector",
            "industry",
            "asset_type",
            "broker",
            "purchase_date",
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

    def get_market_value(self, obj) -> float | None:
        price = obj.current_price or obj.average_price
        if price is not None:
            return round(float(obj.quantity) * float(price), 4)
        return None

    def get_total_gain_loss(self, obj) -> float | None:
        if obj.current_price is not None:
            gain_loss = (float(obj.current_price) - float(obj.average_price)) * float(obj.quantity)
            return round(gain_loss, 4)
        return None

    def get_total_gain_loss_percentage(self, obj) -> float | None:
        if obj.current_price is not None and float(obj.average_price) > 0:
            pct = ((float(obj.current_price) - float(obj.average_price)) / float(obj.average_price)) * 100
            return round(pct, 2)
        return None


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "id",
            "portfolio",
            "symbol",
            "transaction_type",
            "quantity",
            "price",
            "amount",
            "transaction_date",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_portfolio(self, value):
        # Verify the portfolio belongs to the current user
        request = self.context.get("request")
        if request and value.user != request.user:
            raise serializers.ValidationError(
                "You can only associate transactions with your own portfolios."
            )
        return value

    def validate(self, attrs):
        # Custom validation, e.g. quantity must be positive
        qty = attrs.get("quantity", 0.0)
        price = attrs.get("price", 0.0)
        if qty <= 0.0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than zero."}
            )
        if price < 0.0:
            raise serializers.ValidationError(
                {"price": "Price cannot be negative."}
            )
        return attrs


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
        # Ensure the target price is not negative
        target_price = attrs.get("target_price")
        if target_price is not None and target_price < 0.0:
            raise serializers.ValidationError(
                {"target_price": "Target price cannot be negative."}
            )
        return attrs
