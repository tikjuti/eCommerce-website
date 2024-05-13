
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, LogoutSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username,
        token['avatar'] = user.avatar
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            return Response(data={'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response(data={'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
        
        tokens = user.tokens()
        
        data = {
            'id': user.id,
            'username': user.username,
            'avatar': user.avatar,
            'access': tokens['access'],
            'refresh': tokens['refresh']
        }
        
        return Response(data=data, status=status.HTTP_200_OK)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={'message': 'Logout success'}, status=status.HTTP_204_NO_CONTENT)
        