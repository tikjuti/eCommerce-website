from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes

# Create your views here.

class ContactView(APIView):
    def get(self, request):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class ContactDetailView(APIView):
    def get(self, request, contact_id):
        contact = Contact.objects.get(pk=contact_id)
        serializer = ContactSerializer(contact)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class ContactCreateView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ContactUpdateView(APIView):
    def put(self, request, contact_id):
        contact = Contact.objects.get(pk=contact_id)
        serializer = ContactSerializer(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ContactDeleteView(APIView):
    permission_classes = [IsAdminUser]
    def delete(self, request, contact_id):
        contact = Contact.objects.get(pk=contact_id)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
