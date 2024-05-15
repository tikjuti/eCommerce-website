from django.urls import path, include
from .views import (
    OrderCreateView, OrderDetailCreateView, OrderListView, OrderDetailView
)

urlpatterns = [
    path('', OrderListView.as_view(), name='order-list'),
    path('<int:order_id>/', OrderDetailView.as_view(), name='order-detail'),
    path('create/', OrderCreateView.as_view(), name='order-create'),
    path('detail/create/', OrderDetailCreateView.as_view(), name='order-detail-create'),
]
