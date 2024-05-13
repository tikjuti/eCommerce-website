from .models import Category, Product
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    
    # title = serializers.CharField(max_length=255, allow_blank=False, allow_null=False)
    # image = serializers.ImageField()
    
    class Meta:
        model = Category
        fields = ['title', 'image']
        

class ProductSerializer(serializers.ModelSerializer):
    
    
    # title = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    # description = serializers.CharField(allow_null=True, allow_blank=True)
    # price = serializers.FloatField()
    # stock = serializers.IntegerField()
    # brand = serializers.CharField(max_length=100)
    # image = serializers.ImageField(allow_null=False)
    # shipping = serializers.FloatField()
    # category = CategorySerializer()
    category = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id','title', 'description', 'price', 'stock', 'brand', 'ratings_count', 'image', 'shipping', 'category']
        
    def get_category(self, obj):
        return obj.category.title if obj.category else None
   