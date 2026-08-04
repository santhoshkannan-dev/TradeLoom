from celery import shared_task
from apps.portfolio.models.holding import Holding
from apps.portfolio.models.watchlist import Watchlist
from apps.market.services.market_service import MarketService


@shared_task()
def update_market_quotes():
    """
    Celery task to batch update market quotes for all active holdings and watchlist symbols.
    """
    holding_symbols = set(Holding.objects.values_list("symbol", flat=True))
    watchlist_symbols = set(Watchlist.objects.values_list("symbol", flat=True))

    all_symbols = holding_symbols.union(watchlist_symbols)

    for symbol in all_symbols:
        try:
            MarketService.get_quote(symbol, force_fetch=True)
        except Exception:
            pass
