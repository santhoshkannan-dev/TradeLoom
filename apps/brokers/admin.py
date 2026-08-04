from django.contrib import admin
from .models.broker_account import BrokerAccount


@admin.register(BrokerAccount)
class BrokerAccountAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "broker_name",
        "account_id",
        "status",
        "connected_at",
    )
    list_filter = ("broker_name", "status")
    search_fields = ("user__email", "account_id")
    ordering = ("-connected_at",)
