from django.contrib import admin
from .models import Leave

@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    List_display = (
        "employee",
        "leave_type",
        "start_date",
        "end_date",
        "status",
        "create_at"
    )

    list_filter = (
        "leave_type",
        "status",
    )

    search_fields = (
        "employee__employee_id",
        "employee__first_name",
        "employee__last_name",
    )