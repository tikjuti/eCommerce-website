from django.db import models
from authentication.models import User
from products.models import Product

# Create your models here.

class BillingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

class Order(models.Model):
    total_price = models.FloatField()
    order_status = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_price = models.FloatField()
    product_quantity = models.IntegerField()
   