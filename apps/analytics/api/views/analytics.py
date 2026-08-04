from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from apps.portfolio.models.portfolio import Portfolio
from apps.analytics.services.analytics_service import AnalyticsService
from apps.analytics.api.serializers.analytics import AnalyticsReportSerializer


class AnalyticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        portfolio_id = request.query_params.get("portfolio_id")
        if not portfolio_id:
            raise ValidationError(
                {"portfolio_id": "This query parameter is required."}
            )

        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=request.user)
        except (Portfolio.DoesNotExist, ValueError):
            raise ValidationError(
                {
                    "portfolio_id": "Portfolio does not exist or does not belong to you."
                }
            )

        # Generate the analytics report
        report = AnalyticsService.generate_report(portfolio)
        if not report:
            return Response(
                {"error": "No active holdings found in portfolio to analyze."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = AnalyticsReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_200_OK)
