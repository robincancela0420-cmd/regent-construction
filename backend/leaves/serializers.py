from rest_framework import serializers
from .models import Leave

class LeaveSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = Leave
        fields = [
            "id",
            "employee",
            "employee_name",
            "leave_type",
            "start_date",
            "end_date",
            "reason",
            "status",
            "create_at",
        ]

        read_only_fields = ["id", "employee_name", "create_at"]

    def get_employee_name(self, obj):
        return f"{obj.employee.first_name} {obj.employee.last_name}"