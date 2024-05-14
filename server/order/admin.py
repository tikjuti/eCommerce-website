from django.contrib import admin
from .models import BillingAddress, Order, OrderDetail

# Register your models here.

admin.site.register(BillingAddress)
admin.site.register(Order)
admin.site.register(OrderDetail)
