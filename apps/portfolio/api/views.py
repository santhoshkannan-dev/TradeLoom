from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.portfolio.models.portfolio import Portfolio
from apps.portfolio.models.holding import Holding
from apps.portfolio.models.transaction import Transaction
from apps.portfolio.models.watchlist import Watchlist
from apps.portfolio.serializers.portfolio import PortfolioSerializer
from apps.portfolio.serializers.holding import HoldingSerializer
from apps.portfolio.serializers.transaction import TransactionSerializer
from apps.portfolio.serializers.watchlist import WatchlistSerializer
from apps.portfolio.services.dashboard_service import calculate_portfolio_dashboard


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
        stats = calculate_portfolio_dashboard(portfolio)
        return Response(stats, status=status.HTTP_200_OK)


class HoldingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting holdings.
    """
    serializer_class = HoldingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Holding.objects.filter(portfolio__user=self.request.user)
        portfolio_id = self.request.query_params.get("portfolio")
        if portfolio_id:
            queryset = queryset.filter(portfolio_id=portfolio_id)
        return queryset

    def create(self, request, *args, **kwargs):
        # We override create to capture quantity and average_price for initial transaction
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save holding shell
        holding = serializer.save()

        # Check if quantity/average_price were passed in the raw request to auto-create transaction
        raw_qty = request.data.get("quantity")
        raw_price = request.data.get("average_price")
        
        if raw_qty is not None and raw_price is not None:
            try:
                qty = float(raw_qty)
                price = float(raw_price)
                if qty > 0.0:
                    Transaction.objects.create(
                        holding=holding,
                        transaction_type="BUY",
                        quantity=qty,
                        price=price,
                        date=timezone.now(),
                    )
            except ValueError:
                pass

        # Reload holding to get recalculated quantities
        holding.refresh_from_db()
        headers = self.get_success_headers(serializer.data)
        return Response(
            HoldingSerializer(holding).data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class TransactionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting transactions.
    """
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Transaction.objects.filter(holding__portfolio__user=self.request.user)
        holding_id = self.request.query_params.get("holding")
        portfolio_id = self.request.query_params.get("portfolio")
        
        if holding_id:
            queryset = queryset.filter(holding_id=holding_id)
        if portfolio_id:
            queryset = queryset.filter(holding__portfolio_id=portfolio_id)
        return queryset


class WatchlistViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting watchlist items.
    """
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)
