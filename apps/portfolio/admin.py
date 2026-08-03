from django.contrib import admin
from .models import Portfolio


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
