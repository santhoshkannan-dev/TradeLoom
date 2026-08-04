from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AIAdvisorAPIView, AIReportHistoryViewSet

app_name = "ai"

router = DefaultRouter()
router.register("reports", AIReportHistoryViewSet, basename="reports")

urlpatterns = [
    path("advisor/", AIAdvisorAPIView.as_view(), name="advisor"),
    path("", include(router.urls)),
]
