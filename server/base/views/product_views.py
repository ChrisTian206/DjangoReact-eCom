from typing import Any, Dict
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# Create your views here.
from django.contrib.auth.models import User
from base.models import Product
from base.products import products

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import ProductSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    #many=True means there are multiple items in {product}
    #using a serializer, we can then return a JSON object
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


#pk is the primary key of the product, which was included in the api url
# path('procuct/<str:pk>', ...),
@api_view(['GET'])
def getProduct(request, pk):
    target = Product.objects.get(_id=pk)
    serializer = ProductSerializer(target, many = False)
    return Response(serializer.data)

