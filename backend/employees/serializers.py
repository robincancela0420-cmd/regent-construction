from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "employee_id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "position",
            "department",
            "date_hired",
            "salary",
            "is_active",
        ]
        read_only_fields = ["id", "employee_id"]