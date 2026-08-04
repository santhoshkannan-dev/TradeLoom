from celery import shared_task
from apps.news.services.news_service import NewsService


@shared_task()
def update_financial_news():
    """
    Periodic task to fetch live company news and run sentiment analysis.
    """
    count = NewsService.sync_news()
    return f"Synchronized {count} news articles."
