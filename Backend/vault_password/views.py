from vault_password.serializers import UserSerializer, PasswordStorageSerializer
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny

def vault_password(request):
    return HttpResponse("Vault Password")

class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]