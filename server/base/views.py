# from typing import Any, Dict
# from django.shortcuts import render
# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# # Create your views here.
# from django.contrib.auth.models import User
# from .models import Product
# from .products import products
# from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

# from django.contrib.auth.hashers import make_password
# from rest_framework import status

# # This is the format of using django rest framework
# # the curly a bracket is used to define the type of request, it could be GET/PUT/POST/DELETE/.. , also called decorators
# # when accessing the api, it provides a nice-looking interface, instead of the default django interface
# # and just don't forget to return Response() instead of JsonResponse()
# @api_view(['GET'])
# def getRoutes(request):
#     routes=[
#         '/api/products/',
#         '/api/products/create/',
#         '/api/products/upload/',
#         '/api/products/<id>/reviews/',
#         '/api/products/top/',
#         '/api/products/<id>/',
#         '/api/products/delete/<id>/',
#         '/api/products/update/<id>/',
#     ]
#     return Response(routes)

