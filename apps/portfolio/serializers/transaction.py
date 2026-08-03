from rest_framework import serializers
from apps.portfolio.models.transaction import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "id",
            "holding",
            "transaction_type",
            "quantity",
            "price",
            "broker_charge",
            "tax",
            "date",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_holding(self, value):
        # Verify the holding belongs to a portfolio owned by the current user
        request = self.context.get("request")
        if request and value.portfolio.user != request.user:
            raise serializers.ValidationError(
                "You can only associate transactions with your own holdings."
            )
        return value

    def validate(self, attrs):
        qty = float(attrs.get("quantity", 0.0))
        price = float(attrs.get("price", 0.0))
        charge = float(attrs.get("broker_charge", 0.0))
        tax = float(attrs.get("tax", 0.0))

        if qty <= 0.0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than zero."}
            )
        if price < 0.0:
            raise serializers.ValidationError(
                {"price": "Price cannot be negative."}
            )
        if charge < 0.0:
            raise serializers.ValidationError(
                {"broker_charge": "Broker charge cannot be negative."}
            )
        if tax < 0.0:
            raise serializers.ValidationError(
                {"tax": "Tax cannot be negative."}
            )
        return attrs
