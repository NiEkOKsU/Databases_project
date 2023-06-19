from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from .models import Reservation, Equipment, Reservation_detail, Category
from .serializers import UserSerializer, CategorySerializer, EquipmentSerializer, ReservationSerializer, ReservationDetailSerializer

# Create your views here.

@api_view(['GET'])
def getUsers(request):
    users = User.objects.filter(is_staff=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def EquipmentByCategoryView(request, pk):
    category = Category.objects.get(id=pk) #join
    equipments = Equipment.objects.filter(category=category)
    serializer = EquipmentSerializer(equipments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getCurrentReservedQuantity(request, pk, date):
    category = Category.objects.get(id=pk)
    equipments = category.equipment_set.all()
    equipment_serializer = EquipmentSerializer(equipments, many=True)

    data = []

    for el in equipment_serializer.data:
        choosen_equipment = el['id']
        reservation_details = Reservation_detail.objects.filter(equipment=choosen_equipment)
        reservation_detail_ids = reservation_details.values_list('id', flat=True)
        reservation = Reservation.objects.filter(reservation_detail__id__in=reservation_detail_ids)
        reservation_detail_serializer = ReservationDetailSerializer(reservation_details, many=True)
        reservation_serializer = ReservationSerializer(reservation, many=True)
        reservedYet = 0
        
        for i in range(len(reservation_detail_serializer.data)):
            if reservation_serializer.data[i]['reservation_date'] == date:
                reservedYet += reservation_detail_serializer.data[i]['quantity']

        data.append({'equipmentId': el['id'], 'equipmentName': el['equipment_name'],
                     'maxQuantity': el['max_quantity'],
                     'quantityLeft': el['max_quantity'] - reservedYet})

    return Response(data)
    """
    choosen_equipment = Equipment.objects.get(id=pk)
    reservation_details = Reservation_detail.objects.filter(equipment=choosen_equipment)
    reservation_detail_ids = reservation_details.values_list('id', flat=True)
    reservation = Reservation.objects.filter(reservation_detail__id__in=reservation_detail_ids)
    reservation_detail_serializer = ReservationDetailSerializer(reservation_details, many=True)
    reservation_serializer = ReservationSerializer(reservation, many=True)

    reservedYet = 0
    for i in range(len(reservation_detail_serializer.data)):
        if reservation_serializer.data[i]['reservation_date'] == date:
            reservedYet += reservation_detail_serializer.data[i]['quantity']

    return Response(reservedYet)
    """

@api_view(['GET'])
@permission_classes([AllowAny])
def getReservationsView(request, pk):
    active_user = User.objects.get(id=pk)
    reservation = Reservation.objects.filter(user=active_user)
    reservation_serializer = ReservationSerializer(reservation, many=True)
    reservation_detail_ids = [item['reservation_detail'] for item in reservation_serializer.data]
    reservation_detail = Reservation_detail.objects.filter(id__in=reservation_detail_ids)
    reservation_detail_serializer = ReservationDetailSerializer(reservation_detail, many=True)
    
    data = []

    for i in range(len(reservation_serializer.data)):
        equipment = Equipment.objects.filter(id = reservation_detail_serializer.data[i]['equipment'])
        equipment_serializer = EquipmentSerializer(equipment, many=True)
        data.append({'reservationId': reservation_serializer.data[i]['id'],
                     'date': reservation_serializer.data[i]['reservation_date'],
                     'reservationDetailsId': reservation_detail_serializer.data[i]['id'],
                     'quantity': reservation_detail_serializer.data[i]['quantity'],
                     'equipment': equipment_serializer.data[0]['equipment_name']
                     })

    return Response(data)

@api_view(['POST'])
def makeReservation(request):
    data = request.data
    reservation_owner = User.objects.get(id = data['user_id'])
    category = Category.objects.get(id = data['selected_category'])
    reservation_equipment = Equipment.objects.get(id = data['selected_equipment'])
    reservation_details = Reservation_detail.objects.create(equipment = reservation_equipment, quantity = data['reservation_qantity'])
    reservation = Reservation.objects.create(user = reservation_owner, reservation_date = data['reservation_date'], reservation_detail = reservation_details)
    
    serializer = ReservationDetailSerializer(reservation_details, many=False)
    serializer2 = ReservationSerializer(reservation, many=False)

    return Response(serializer2.data)


@api_view(['DELETE'])
def deleteReservation(request, pk):
    reservation = Reservation.objects.get(id=pk)
    reservation_serializer = ReservationSerializer(reservation, many=False)
    reservation_detail = Reservation_detail.objects.filter(id=reservation_serializer.data['reservation_detail'])
    
    reservation.delete()
    reservation_detail.delete()
    
    return Response("DB was updated!")
