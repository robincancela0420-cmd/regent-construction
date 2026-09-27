from django.contrib import admin
from . models import Employee

@admin.register(Employee)
class Employee(admin.ModelAdmin):
    list_display = (
        "employee_id",
        "first_name",
        "last_name",
        "department",
        "position",
        "date_hired",
        "is_active",
    )

    search_fields = (
        "employee_id",
        "first_name",
        "last_name",
        "email",
    )

    list_filter = (
        "department",
        "is_active",
    )