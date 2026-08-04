from django.urls import path
from .views import (
    NewsListView,
    CompanyNewsView,
    PortfolioNewsView,
    AnalyzeSentimentView,
)

app_name = "news"
urlpatterns = [
    path("", NewsListView.as_view(), name="list"),
    path("company/<str:symbol>/", CompanyNewsView.as_view(), name="company"),
    path("portfolio/", PortfolioNewsView.as_view(), name="portfolio"),
    path("analyze/", AnalyzeSentimentView.as_view(), name="analyze"),
]
