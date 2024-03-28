from typing import Any, Dict
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# Create your views here.
from django.contrib.auth.models import User
from base.models import Product
from base.products import products
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['POST'])
def registerUser(request):
    try:
        #data is a dict type
        data = request.data
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']), #the beauty of battery-included framework :)
        )

        #we wanna give this user a token as soon as they register
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        msg = {'email is already is use'}
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated]) #no varified token, no views
def updateUserProfile(request):

    user = request.user
    serializer = UserSerializer(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['name']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) #no varified token, no views
def getUserProfile(request):

    #This would be normally how to get authenticated user using the default Django way
    #But since we are using Django-restframework and JWT Token way(in settings.py we set 
    #the default auth method to JWT Auth), we need to include the token in the headers
    #of our GET request as: {KEY: Authorization, Value:"Bearer ${access token}"}

    user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    #many=True means there are multiple items in {product}
    #using a serializer, we can then return a JSON object
    serializer = UserSerializer(users, many=True)
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
        # data['username'] = self.user.username
        # data['email'] = self.user.email 

        serializer = UserSerializerWithToken(self.user).data
        for key,value in serializer.items():
            data[key]=value
            
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer