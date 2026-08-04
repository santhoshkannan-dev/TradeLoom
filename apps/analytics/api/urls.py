from django.urls import path
from .views import AnalyticsAPIView

app_name = "analytics"
urlpatterns = [
    path("", AnalyticsAPIView.as_view(), name="report"),
]
