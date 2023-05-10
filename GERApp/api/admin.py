from django.contrib import admin
from .models import Reservation
from .models import Equipment
from .models import Reservation_detail

# Register your models here.

admin.site.register(Reservation)
admin.site.register(Equipment)
admin.site.register(Reservation_detail)