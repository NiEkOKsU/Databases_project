from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

def validate_max_quantity(value):
    if value <= 0:
        raise ValidationError("Max quantity must by grater then 0!")

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reservation_date = models.DateField()

class Equipment(models.Model):
    equipment_name = models.TextField(max_length=50)
    max_quantity = models.IntegerField(validators=[validate_max_quantity])

class Reservation_detail(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    quantity = models.IntegerField()
