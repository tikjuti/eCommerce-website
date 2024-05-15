from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order, OrderDetail
from .serializers import OrderSerializer, OrderDetailSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.
    
class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OrderListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, order_id):
        order = Order.objects.get(pk=order_id)
        serializer = OrderSerializer(order)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class OrderDetailCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = OrderDetailSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    