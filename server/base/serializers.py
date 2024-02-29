from rest_framework import serializers

#this User is one of the built-in User model, it comes with authentication and authorization
from django.contrib.auth.models import User
from .models import Product

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

#what it does is it's gonna wrap around the Product model and turn it into JSON format
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'