from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.portfolio.models.watchlist import Watchlist
from apps.portfolio.api.serializers.watchlist import WatchlistSerializer


class WatchlistViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, updating, and deleting watchlist items.
    """
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)
