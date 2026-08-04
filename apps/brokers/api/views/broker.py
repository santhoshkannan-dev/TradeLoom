from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from apps.brokers.models.broker_account import BrokerAccount
from apps.brokers.api.serializers.broker import (
    BrokerAccountSerializer,
    CSVImportSerializer,
)
from apps.brokers.services.import_service import ImportService


class BrokerAccountViewSet(viewsets.ModelViewSet):
    serializer_class = BrokerAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BrokerAccount.objects.filter(user=self.request.user)


class CSVImportAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = CSVImportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        portfolio_id = serializer.validated_data["portfolio"]
        csv_file = serializer.validated_data["file"]

        # Read content from uploaded file
        try:
            csv_content = csv_file.read().decode("utf-8")
        except Exception as e:
            return Response(
                {"error": f"Failed to read CSV file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        summary = ImportService.import_portfolio_csv(
            user=request.user,
            portfolio_id=portfolio_id,
            csv_content=csv_content,
        )

        return Response(summary, status=status.HTTP_200_OK)
