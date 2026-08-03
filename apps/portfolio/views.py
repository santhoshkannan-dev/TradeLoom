from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.portfolio.models import Portfolio, Holding, Transaction, Watchlist
from apps.portfolio.serializers import (
    PortfolioSerializer,
    HoldingSerializer,
    TransactionSerializer,
    WatchlistSerializer,
)


class PortfolioViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting portfolios.
    Enforces user isolation (users can only access their own portfolios).
    """
    serializer_class = PortfolioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user).prefetch_related("holdings")


class HoldingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting holdings.
    Enforces user isolation and allows filtering by portfolio.
    """
    serializer_class = HoldingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Holding.objects.filter(portfolio__user=self.request.user)
        portfolio_id = self.request.query_params.get("portfolio")
        if portfolio_id:
            queryset = queryset.filter(portfolio_id=portfolio_id)
        return queryset


class TransactionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting transactions.
    Enforces user isolation and allows filtering by portfolio or symbol.
    """
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Transaction.objects.filter(portfolio__user=self.request.user)
        portfolio_id = self.request.query_params.get("portfolio")
        symbol = self.request.query_params.get("symbol")
        if portfolio_id:
            queryset = queryset.filter(portfolio_id=portfolio_id)
        if symbol:
            queryset = queryset.filter(symbol__iexact=symbol)
        return queryset


class WatchlistViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting watchlist items.
    Enforces user isolation.
    """
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)
