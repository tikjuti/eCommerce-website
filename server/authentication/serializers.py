from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError # type: ignore


class UserSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(max_length=150, allow_blank=False)
    email = serializers.EmailField(max_length=200, allow_blank=False)
    phone_number = serializers.CharField(min_length=10, allow_blank=False)
    password = serializers.CharField(min_length=8, write_only=True, allow_blank=False)
    
    class Meta:
        model = User
        fields = ['id','username', 'email', 'phone_number', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, data):
        
        username_exits = User.objects.filter(username=data['username']).exists()
        if username_exits:
            raise serializers.ValidationError("Username already exists")
        
        email_exits = User.objects.filter(email=data['email']).exists()
        if email_exits:
            raise serializers.ValidationError("Email already exists")
        
        phone_number_exits = User.objects.filter(phone_number=data['phone_number']).exists()
        if phone_number_exits:
            raise serializers.ValidationError("Phone number already exists")
        
        return super().validate(data)
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        
        return instance
    
class LogoutSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs

    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidationError(self.default_error_messages['bad_token'])
        