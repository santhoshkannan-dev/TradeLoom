from rest_framework import serializers
from apps.ai.models.ai_report import AIAnalysisReport


class AIAnalysisReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIAnalysisReport
        fields = [
            "id",
            "portfolio",
            "prompt_version",
            "response",
            "generated_at",
            "created_at",
            "updated_at",
        ]


class AIAdvisorRequestSerializer(serializers.Serializer):
    portfolio_id = serializers.UUIDField(required=True)
