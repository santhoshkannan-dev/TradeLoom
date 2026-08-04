from django.contrib import admin
from .models.broker_account import BrokerAccount
from .models.import_job import ImportJob


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


@admin.register(ImportJob)
class ImportJobAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "portfolio",
        "broker",
        "file_name",
        "status",
        "imported_records",
        "failed_records",
        "created_at",
    )
    list_filter = ("broker", "status")
    search_fields = ("user__email", "file_name")
    ordering = ("-created_at",)
