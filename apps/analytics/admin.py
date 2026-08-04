from django.contrib import admin
from .models.analytics_report import AnalyticsReport


@admin.register(AnalyticsReport)
class AnalyticsReportAdmin(admin.ModelAdmin):
    list_display = ("portfolio", "score", "generated_at")
    list_filter = ("score", "generated_at")
    search_fields = ("portfolio__name",)
    ordering = ("-generated_at",)
