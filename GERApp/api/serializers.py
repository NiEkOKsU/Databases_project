from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User
from .models import Reservation
from .models import Equipment
from .models import Reservation_detail
from .models import Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class ReservationDetailSerializer(ModelSerializer):
    class Meta:
        model = Reservation_detail
        fields = '__all__'

class EquipmentSerializer(ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'