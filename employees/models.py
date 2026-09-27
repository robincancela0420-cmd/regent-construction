from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        editable=False,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True)
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    date_hired = models.DateField()
    salary = models.DecimalField(max_digits=12, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        super().save(*args, **kwargs)

        if is_new and not self.employee_id:
            self.employee_id = f"EMP-{self.pk:06d}"
            super().save(update_fields=["employee_id"])

    def __str__(self):
        return f"{self.employee_id} - {self.first_name} {self.last_name}"