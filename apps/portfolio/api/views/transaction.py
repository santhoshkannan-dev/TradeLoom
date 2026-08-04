from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.portfolio.models.transaction import Transaction
from apps.portfolio.api.serializers.transaction import TransactionSerializer
from apps.portfolio.services.transaction_service import TransactionService


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

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        instance = TransactionService.create_transaction(validated_data)
        serializer.instance = instance
