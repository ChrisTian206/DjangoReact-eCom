from typing import Any, Dict
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

from .models import Product
from .products import products
from .serializers import ProductSerializer, UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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
def getUserProfile(request):

    #This would be normally how to get authenticated user using the default Django way
    #But since we are using Django-restframework and JWT Token way(in settings.py we set 
    #the default auth method to JWT Auth), we need to include the token in the headers
    #of our GET request as: {KEY: Authorization, Value:"Bearer ${access token}"}

    user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        #calls parent class's validate() with user input, attrs 
        data = super().validate(attrs)
        
        # attrs contains what is entered from the user, similar to req.body/req.params/...
        # Input are stored in a ordered dictionary. 
        #print(attrs) -> OrderedDict([('username', 'chris'), ('password', 'chris')])

        #Also, refresh and access token are automatically included. So we dont need to
        # write anything about it.

        # oringinally: 
        # data["refresh"] = str(refresh)
        # data["access"] = str(refresh.access_token)

        #self.user is part of the Serializer class from the package
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer