from rest_framework import serializers
from apps.brokers.models.broker_account import BrokerAccount
from apps.brokers.models.import_job import ImportJob
from common.constants.choices import Broker


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


class ImportJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportJob
        fields = [
            "id",
            "user",
            "portfolio",
            "broker",
            "file_name",
            "status",
            "imported_records",
            "failed_records",
            "started_at",
            "finished_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "status",
            "imported_records",
            "failed_records",
            "started_at",
            "finished_at",
            "created_at",
            "updated_at",
        ]


class CSVImportSerializer(serializers.Serializer):
    portfolio = serializers.UUIDField(required=True)
    broker = serializers.ChoiceField(choices=Broker.choices, required=True)
    file = serializers.FileField(required=True)
