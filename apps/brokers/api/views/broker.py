import uuid
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework import status, viewsets, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from apps.portfolio.models.portfolio import Portfolio
from apps.brokers.models.broker_account import BrokerAccount
from apps.brokers.models.import_job import ImportJob
from apps.brokers.api.serializers.broker import (
    BrokerAccountSerializer,
    CSVImportSerializer,
    ImportJobSerializer,
)
from apps.brokers.tasks import process_csv_import


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
        broker = serializer.validated_data["broker"]
        csv_file = serializer.validated_data["file"]

        # Validate portfolio ownership
        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=request.user)
        except Portfolio.DoesNotExist:
            raise ValidationError(
                {"portfolio": "Portfolio does not exist or does not belong to you."}
            )

        # Save file to temporary path
        try:
            file_name = f"imports/{uuid.uuid4()}_{csv_file.name}"
            saved_path = default_storage.save(
                file_name, ContentFile(csv_file.read())
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to save file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create import job
        job = ImportJob.objects.create(
            user=request.user,
            portfolio=portfolio,
            broker=broker,
            file_name=csv_file.name,
            status=ImportJob.JobStatus.PENDING,
        )

        # Trigger Celery Task
        process_csv_import.delay(job.id, saved_path)

        job_serializer = ImportJobSerializer(job)
        return Response(job_serializer.data, status=status.HTTP_202_ACCEPTED)


class ImportHistoryViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    serializer_class = ImportJobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ImportJob.objects.filter(user=self.request.user)
