from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

#what it does is it's gonna wrap around the Product model and turn it into JSON format
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'