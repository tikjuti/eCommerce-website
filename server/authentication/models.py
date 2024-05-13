from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from rest_framework_simplejwt.tokens import RefreshToken


# Create your models here.

  
class User(AbstractUser):
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=200, unique=True, null=False)
    phone_number = models.CharField(max_length=10, unique=True, null=False)
    avatar = models.CharField(max_length=255, blank=True, default='https://res.cloudinary.com/dw3oj3iju/image/upload/v1709749732/chat_app/b1rj7epnhdqo6t7mcu5w.jpg')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']
    
    objects = UserManager()
    
    
    def __str__(self):
        return f"<User {self.email}>"
    
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    