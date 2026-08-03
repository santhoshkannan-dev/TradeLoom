from django.contrib import admin
from .models import Portfolio, Holding, Transaction


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


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "holding",
        "transaction_type",
        "quantity",
        "price",
        "transaction_date",
    )

    search_fields = (
        "holding__symbol",
    )

    list_filter = (
        "transaction_type",
    )
