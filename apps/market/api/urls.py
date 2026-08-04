from django.urls import path
from .views import MarketQuoteAPIView, MarketHistoryAPIView, MarketSearchAPIView

app_name = "market"
urlpatterns = [
    path("quote/<str:symbol>/", MarketQuoteAPIView.as_view(), name="quote"),
    path("history/<str:symbol>/", MarketHistoryAPIView.as_view(), name="history"),
    path("search/", MarketSearchAPIView.as_view(), name="search"),
]
