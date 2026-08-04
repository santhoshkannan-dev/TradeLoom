from rest_framework import serializers
from apps.brokers.models.broker_account import BrokerAccount


class BrokerAccountSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = BrokerAccount
        fields = [
            "id",
            "user",
            "broker_name",
            "account_id",
            "status",
            "connected_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "connected_at",
            "created_at",
            "updated_at",
        ]


class CSVImportSerializer(serializers.Serializer):
    portfolio = serializers.UUIDField(required=True)
    file = serializers.FileField(required=True)
