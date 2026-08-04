from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.market.services.market_service import MarketService
from apps.market.api.serializers.quote import MarketQuoteSerializer


class MarketQuoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, symbol):
        """
        GET /api/market/quote/{symbol}
        """
        try:
            quote = MarketService.get_quote(symbol)
            serializer = MarketQuoteSerializer(quote)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MarketHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, symbol):
        """
        GET /api/market/history/{symbol}
        """
        period = request.query_params.get("period", "1mo")
        try:
            history = MarketService.get_historical_prices(symbol, period=period)
            return Response(history, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MarketSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/market/search?q=infosys
        """
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response(
                {"error": "Query parameter 'q' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            results = MarketService.search_symbols(query)
            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
