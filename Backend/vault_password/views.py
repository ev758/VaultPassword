from vault_password.models import PasswordStorage
from vault_password.serializers import UserSerializer, PasswordStorageSerializer
from cryptography.fernet import Fernet
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

def vault_password(request):
    return HttpResponse("Vault Password")

class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class AddPassword(generics.CreateAPIView):
    serializer_class = PasswordStorageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            fernet = Fernet(settings.SECRET_KEY)

            #converts password string to bytes
            encoded_password = serializer.validated_data['stored_password'].encode('utf-8')
            #encrypts password
            ciphertext = fernet.encrypt(encoded_password)
            #converts cipher text bytes to string
            password = ciphertext.decode('utf-8')
            #sets password
            serializer.validated_data['stored_password'] = password

            #converts note string to bytes
            encoded_note = serializer.validated_data['note'].encode('utf-8')
            #encrypts note
            ciphertext = fernet.encrypt(encoded_note)
            #converts cipher text bytes to string
            note = ciphertext.decode('utf-8')
            #sets note
            serializer.validated_data['note'] = note

            serializer.save(account=self.request.user)
        else:
            print(serializer.errors)

class PasswordStorageList(generics.ListAPIView):
    serializer_class = PasswordStorageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PasswordStorage.objects.filter(account=self.request.user).order_by('category', 'website_name')

class ModalPasswordStorage(generics.RetrieveAPIView):
    serializer_class = PasswordStorageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        #declarations
        password_storage = PasswordStorage.objects.get(pk=self.kwargs['pk'])
        fernet = Fernet(settings.SECRET_KEY)
        
        #decrypts password
        plaintext = fernet.decrypt(password_storage.stored_password)
        #converts plaintext bytes to string
        password = plaintext.decode('utf-8')
        #sets password
        password_storage.stored_password = password

        #decrypts note
        plaintext = fernet.decrypt(password_storage.note)
        #converts plaintext bytes to string
        note = plaintext.decode('utf-8')
        #sets note
        password_storage.note = note

        password_storage.save()
        
        return password_storage

class UpdatePasswordStorage(generics.UpdateAPIView):
    queryset = PasswordStorage.objects.all()
    serializer_class = PasswordStorageSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.is_valid():
            fernet = Fernet(settings.SECRET_KEY)

            #converts password string to bytes
            encoded_password = serializer.validated_data['stored_password'].encode('utf-8')
            #encrypts password
            ciphertext = fernet.encrypt(encoded_password)
            #converts cipher text bytes to string
            password = ciphertext.decode('utf-8')
            #sets password
            serializer.validated_data['stored_password'] = password

            #converts note string to bytes
            encoded_note = serializer.validated_data['note'].encode('utf-8')
            #encrypts note
            ciphertext = fernet.encrypt(encoded_note)
            #converts cipher text bytes to string
            note = ciphertext.decode('utf-8')
            #sets note
            serializer.validated_data['note'] = note

            serializer.save(account=self.request.user)
        else:
            print(serializer.errors)

class Profile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return User.objects.get(pk=user.id)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()
        else:
            print(serializer.errors)
    
    def perform_destroy(self, instance):
        instance.delete()