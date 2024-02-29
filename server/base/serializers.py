from rest_framework import serializers

#this User is one of the built-in User model, it comes with authentication and authorization
from django.contrib.auth.models import User
from .models import Product

class UserSerializer(serializers.ModelSerializer):
    #SerializerMethodField() would match the field with corresponding methods to get its value
    #👇, variable name is 'name', then it will look for get_name()
    #so, if there's another variale called Gabagoo = serializers.SerializerMethodField(),
    #It will look for get_Gabagoo() to get its value.
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username','email','name']

    
    #Python indentation is important. 
    #Pointing out an error I made earlier. The following method was indented into the class Meta,
    #causing compiler error. UserSerializer wasn't able to find get_name()
    def get_name(self, obj):
        #The 'self' is the serializer itself. If I need to access mother fields or methods of this serializer
        #The 'obj' is this specific object that is being serialized. In this case would just be the User.

        name = obj.first_name

        #first_name not last_name was not a required field.
        if name == '':
            name = obj.email

        return name


#what it does is it's gonna wrap around the Product model and turn it into JSON format
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'