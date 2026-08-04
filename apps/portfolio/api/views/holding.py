from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.portfolio.models.holding import Holding
from apps.portfolio.api.serializers.holding import HoldingSerializer
from apps.portfolio.services.transaction_service import TransactionService


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
                    TransactionService.create_transaction({
                        "holding": holding,
                        "transaction_type": "BUY",
                        "quantity": qty,
                        "price": price,
                        "transaction_date": timezone.now(),
                    })
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
