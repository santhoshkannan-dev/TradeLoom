from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, HoldingViewSet, TransactionViewSet, WatchlistViewSet
from .views.dashboard import DashboardAPIView

router = DefaultRouter()
router.register("portfolios", PortfolioViewSet, basename="portfolio")
router.register("holdings", HoldingViewSet, basename="holding")
router.register("transactions", TransactionViewSet, basename="transaction")
router.register("watchlist", WatchlistViewSet, basename="watchlist")

app_name = "portfolio"
urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
]
