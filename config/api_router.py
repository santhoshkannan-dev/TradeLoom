from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.users.api.views import UserViewSet
from apps.portfolio.api.views import (
    PortfolioViewSet,
    HoldingViewSet,
    TransactionViewSet,
    WatchlistViewSet,
)

from django.urls import include, path
from apps.portfolio.api.views.dashboard import DashboardAPIView

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("portfolios", PortfolioViewSet, basename="portfolio")
router.register("holdings", HoldingViewSet, basename="holding")
router.register("transactions", TransactionViewSet, basename="transaction")
router.register("watchlist", WatchlistViewSet, basename="watchlist")


app_name = "api"
urlpatterns = router.urls + [
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
    path("market/", include("apps.market.api.urls", namespace="market")),
    path("brokers/", include("apps.brokers.api.urls", namespace="brokers")),
    path("analytics/", include("apps.analytics.api.urls", namespace="analytics")),
]
