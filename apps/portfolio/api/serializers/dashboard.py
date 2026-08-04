from rest_framework import serializers


class DashboardSummarySerializer(serializers.Serializer):
    total_investment = serializers.DecimalField(max_digits=18, decimal_places=2)
    current_value = serializers.DecimalField(max_digits=18, decimal_places=2)
    profit = serializers.DecimalField(max_digits=18, decimal_places=2)
    profit_percentage = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_holdings = serializers.IntegerField()
    total_transactions = serializers.IntegerField()


class DashboardHoldingSerializer(serializers.Serializer):
    symbol = serializers.CharField()
    avg_price = serializers.DecimalField(max_digits=18, decimal_places=2)
    current_price = serializers.DecimalField(max_digits=18, decimal_places=2)
    profit = serializers.DecimalField(max_digits=18, decimal_places=2)


class DashboardSerializer(serializers.Serializer):
    summary = DashboardSummarySerializer()
    asset_allocation = serializers.ListField(child=serializers.DictField())
    sector_allocation = serializers.ListField(child=serializers.DictField())
    top_holdings = serializers.ListField(child=serializers.DictField())
    recent_transactions = serializers.ListField(child=serializers.DictField())
    holdings = DashboardHoldingSerializer(many=True)
