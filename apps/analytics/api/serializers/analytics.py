from rest_framework import serializers
from apps.analytics.models.analytics_report import AnalyticsReport


class AnalyticsReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsReport
        fields = [
            "id",
            "portfolio",
            "score",
            "summary",
            "allocation",
            "risk",
            "performance",
            "generated_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "score",
            "summary",
            "allocation",
            "risk",
            "performance",
            "generated_at",
            "created_at",
            "updated_at",
        ]
