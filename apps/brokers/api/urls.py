from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import BrokerAccountViewSet, CSVImportAPIView

router = DefaultRouter()
router.register("accounts", BrokerAccountViewSet, basename="account")

app_name = "brokers"
urlpatterns = [
    path("", include(router.urls)),
    path("import-csv/", CSVImportAPIView.as_view(), name="import-csv"),
]
