from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.portfolio.models.portfolio import Portfolio
from apps.portfolio.api.serializers.portfolio import PortfolioSerializer
from apps.portfolio.selectors.dashboard_selector import DashboardSelector


class PortfolioViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting portfolios.
    """
    serializer_class = PortfolioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user).prefetch_related("holdings")

    @action(detail=True, methods=["get"])
    def dashboard(self, request, pk=None):
        """
        Exposes the portfolio calculations and performance metrics.
        """
        portfolio = self.get_object()
        stats = DashboardSelector.calculate_summary(portfolio)
        return Response(stats, status=status.HTTP_200_OK)
