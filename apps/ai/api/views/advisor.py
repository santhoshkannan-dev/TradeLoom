from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from apps.portfolio.models.portfolio import Portfolio
from apps.ai.models.ai_report import AIAnalysisReport
from apps.ai.api.serializers.advisor import (
    AIAnalysisReportSerializer,
    AIAdvisorRequestSerializer,
)
from apps.ai.services.advisor_service import AdvisorService


class AIAdvisorAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AIAdvisorRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        portfolio_id = serializer.validated_data["portfolio_id"]

        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=request.user)
        except (Portfolio.DoesNotExist, ValueError):
            raise ValidationError(
                {
                    "portfolio_id": "Portfolio does not exist or does not belong to you."
                }
            )

        advice = AdvisorService.get_portfolio_advice(portfolio)
        return Response(advice, status=status.HTTP_200_OK)


class AIReportHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AIAnalysisReportSerializer

    def get_queryset(self):
        return AIAnalysisReport.objects.filter(
            portfolio__user=self.request.user
        )
