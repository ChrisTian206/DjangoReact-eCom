from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


# This is the format of using django rest framework
# the curly a bracket is used to define the type of request, it could be GET/PUT/POST/DELETE/.. , also called decorators
# when accessing the api, it provides a nice-looking interface, instead of the default django interface
# and just don't forget to return Response() instead of JsonResponse()
@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/update/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    return Response(products)

#pk is the primary key of the product, which was included in the api url
# path('procuct/<str:pk>', ...),
@api_view(['GET'])
def getProduct(request, pk):
    target = None
    for product in products:
        if product['_id'] == pk:
            target = product
            break
    return Response(target)