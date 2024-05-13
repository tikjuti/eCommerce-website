from django.urls import path, include
from .views import (
    CategoryView, ProductView, CategoryCreateView, 
    ProductDetailView ,ProductCreateView
)
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('category', CategoryView, basename='category')


urlpatterns = [
    path('', ProductView.as_view(), name='products'),
    # path('', views.index, name='products'),
    
    path('<int:product_id>/', ProductDetailView.as_view(), name='detail-product'),
    path('create/', ProductCreateView.as_view(), name='create-product'),
    
    path('', include(router.urls)),
    # path('category/', CategoryView.as_view(), name='category'),
    path('category/create', CategoryCreateView.as_view(), name='create-category'),
]