from django.db import models

# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=255, null=False, blank=False)
    
    
    def __str__(self):
        return self.title
    
class Product(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField()
    stock = models.IntegerField()
    ratings = models.IntegerField(default=5)
    ratings_count = models.IntegerField(default=5)
    brand = models.CharField(max_length=100, null=True, blank=True)
    image = models.CharField(max_length=255, null=False, blank=False)
    shipping = models.FloatField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.title