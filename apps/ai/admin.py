from django.contrib import admin
from .models.ai_report import AIAnalysisReport


@admin.register(AIAnalysisReport)
class AIAnalysisReportAdmin(admin.ModelAdmin):
    list_display = ("portfolio", "prompt_version", "generated_at")
    list_filter = ("prompt_version", "generated_at")
    search_fields = ("portfolio__name",)
    ordering = ("-generated_at",)
