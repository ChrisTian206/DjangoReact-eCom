from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# the models.Model tells Django this class is actually a model
class Product(models.Model):
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null=True)
    name = models.CharField(max_length = 200, null=True, blank=True)
    #image = 
    brand = models.CharField(max_length = 200, null=True, blank=True)
    category = models.CharField(max_length = 200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=1,null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add = True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name
    
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length = 200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length = 200, null=True, blank=True)
    tax = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    shipping = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidOn = models.BooleanField(default=False)
    isDelivered = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    deliveredAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    createdOn = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdOn)



