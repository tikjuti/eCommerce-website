from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Email address is not valid")
    
    def create_user(self, email, password, username, **extra_fields):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else: 
            raise ValueError(_('An email address is required'))
        
        if not password:
            raise ValueError(_('A password is required'))
        
        if not username:
            raise ValueError(_('A username is required'))
        
        user = self.model(email=email, username = username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    
    def create_superuser(self, email, password, username, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff as True'))
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser as True'))
        
        if extra_fields.get('is_active') is not True:
            raise ValueError(_('Superuser must have is_active as True'))
        
        return self.create_user(email, password, username, **extra_fields)