from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import BrokerAccountViewSet, CSVImportAPIView, ImportHistoryViewSet

router = DefaultRouter()
router.register("accounts", BrokerAccountViewSet, basename="account")
router.register(
    "import-history", ImportHistoryViewSet, basename="import-history"
)

app_name = "brokers"
urlpatterns = [
    path("", include(router.urls)),
    path("import-csv/", CSVImportAPIView.as_view(), name="import-csv"),
]
