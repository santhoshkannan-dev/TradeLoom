from django.contrib import admin
from .models import Portfolio, Holding


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "user",
        "base_currency",
        "created_at",
    )

    search_fields = (
        "name",
        "user__email",
    )

    list_filter = (
        "base_currency",
    )


@admin.register(Holding)
class HoldingAdmin(admin.ModelAdmin):
    list_display = (
        "symbol",
        "portfolio",
        "quantity",
        "average_price",
        "broker",
    )

    search_fields = (
        "symbol",
        "company_name",
    )

    list_filter = (
        "exchange",
        "broker",
        "asset_type",
    )
