from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.portfolio.services.dashboard_service import DashboardService
from apps.portfolio.api.serializers.dashboard import DashboardSerializer


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = DashboardService.get_dashboard(request.user)
        serializer = DashboardSerializer(data)
        return Response(serializer.data)
