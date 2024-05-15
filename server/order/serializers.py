from .models import Order, OrderDetail
from rest_framework import serializers
from authentication.models import User
from authentication.serializers import UserSerializer

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['id', 'order', 'product', 'product_price', 'product_quantity']
        extra_kwargs = {
            'order': {'required': False}
        }

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'total_price', 'order_status', 'order_date', 'country', 'city', 'user', 'order_details']
        extra_kwargs = {
            'user': {'required': False}
        }
        
    def create(self, validated_data):
        order_details = validated_data.pop('order_details')
        order = Order.objects.create(**validated_data)
        
        for order_detail in order_details:
            OrderDetail.objects.create(order=order, **order_detail) 
        return order
        
