"""
URL configuration for GERApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/user/', views.getUsers, name='users'),
    path('categories/', views.getCategories, name='categories'),
    path('api/reservations/<int:pk>/', views.getReservationsView, name='listReservation'),
    path('api/reservations/<int:pk>/remove/', views.deleteReservation, name='removeReservation'),
    path('api/categories/equipment/reservation/', views.makeReservation, name='makeReservationView'),
    path('api/categories/<int:pk>/equipment/', views.EquipmentByCategoryView, name='equipmentsByCategories'),
    path('api/categories/equipment/<int:pk>/<str:date>/', views.getCurrentReservedQuantity, name='getReservedQuantity'),
]
