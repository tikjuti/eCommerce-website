from django.urls import path, include
from .views import (
    ContactView, ContactCreateView, ContactDetailView, ContactUpdateView, ContactDeleteView
)

urlpatterns = [
    path('', ContactView.as_view(), name='contacts'),
    path('create/', ContactCreateView.as_view(), name='create-contact'),
    path('<int:contact_id>/', ContactDetailView.as_view(), name='detail-contact'),
    path('update/<int:contact_id>/', ContactUpdateView.as_view(), name='update-contact'),
    path('delete/<int:contact_id>/', ContactDeleteView.as_view(), name='delete-contact'),
]
