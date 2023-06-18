from django.urls import path
from . import views

urlpatterns = [
    path('auth/user/', views.getUsers, name='users'),
    path('categories/', views.getCategories, name='categories'),
    path('api/categories/<int:pk>/equipment/', views.EquipmentByCategoryView, name='equipmentsByCategories'),
]
