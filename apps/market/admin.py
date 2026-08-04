from django.contrib import admin
from .models.quote import MarketQuote


@admin.register(MarketQuote)
class MarketQuoteAdmin(admin.ModelAdmin):
    list_display = (
        "symbol",
        "current_price",
        "previous_close",
        "change",
        "change_percent",
        "volume",
        "updated_at",
    )
    search_fields = ("symbol",)
    ordering = ("symbol",)
