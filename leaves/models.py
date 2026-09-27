from django.db import models
from employees.models import Employee

class Leave(models.Model):
    LEAVE_TYPES = [
        ("vacation", "Vacation Leave"),
        ("sick", "Sick Leave"),
        ("emergency", "Emergency Leave"),
        ("maternity", "Maternity Leave"),
        ("paternity", "Paternity Leave"),
        ("bereavement", "Bereavement Leave"),
        ("unpaid", "Unpaid Leave"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="leaves",
    )
    leave_type = models.CharField(
        max_length=20,
        choices=LEAVE_TYPES,
    )

    start_date = models.DateField()
    end_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    reason = models.TextField(blank=True, null=True)

    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee} - {self.leave_type} - {self.status}"