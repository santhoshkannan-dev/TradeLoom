from rest_framework import serializers
from apps.portfolio.models.portfolio import Portfolio


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
            "description",
            "base_currency",
            "holdings_count",
            "total_value",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_total_value(self, obj) -> float:
        total = 0.0
        for holding in obj.holdings.all():
            total += float(holding.quantity) * float(holding.average_price)
        return round(total, 4)
