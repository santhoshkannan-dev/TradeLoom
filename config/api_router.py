from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.users.api.views import UserViewSet
from apps.portfolio.views import (
    PortfolioViewSet,
    HoldingViewSet,
    TransactionViewSet,
    WatchlistViewSet,
)

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("portfolios", PortfolioViewSet, basename="portfolio")
router.register("holdings", HoldingViewSet, basename="holding")
router.register("transactions", TransactionViewSet, basename="transaction")
router.register("watchlist", WatchlistViewSet, basename="watchlist")


app_name = "api"
urlpatterns = router.urls
