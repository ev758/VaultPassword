from vault_password.models import PasswordStorage, Authentication, ForgotPassword
from vault_password.serializers import UserSerializer, PasswordStorageSerializer, AuthenticationSerializer, ForgotPasswordSerializer
from cryptography.fernet import Fernet
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
import os
import pyotp
import qrcode

def vault_password(request):
    return HttpResponse("Vault Password")

class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class VerifiedAuthentication(generics.RetrieveAPIView):
    serializer_class = AuthenticationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user = User.objects.get(username=self.kwargs['username'])
        return Authentication.objects.get(account=user)

class AccountAuthentication(generics.CreateAPIView):
    serializer_class = AuthenticationSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        totp = pyotp.TOTP(settings.AUTHENTICATION_KEY)

        if totp.verify(request.data['authentication_code']):
            return HttpResponse("Authentication Verified")
        
        raise ValueError("Invalid Authentication Code")

class ForgotPasswordEmail(generics.CreateAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        #gets user object by email
        user = User.objects.get(email=request.data['email'])

        if user is not None:
            password_reset_generator = PasswordResetTokenGenerator()
            #creates password reset token
            password_reset = password_reset_generator.make_token(user)

            #creates forgot password object
            forgot_password = ForgotPassword(email=request.data['email'], password_reset_token=password_reset, account=user)
            forgot_password.save()

            forgot_password_link = f"{settings.VITE}/forgot-password/{password_reset}"

            #sends an email to recipient
            subject = "Password Reset"
            message = "Click the link to reset your password.\n\n" + forgot_password_link
            from_email = settings.EMAIL_HOST_USER
            recipient_email = user.email
            send_mail(subject, message, from_email, [recipient_email])

            return HttpResponse("Password reset sent")
        
        return HttpResponse("Invalid email address")

class PasswordReset(generics.CreateAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        #gets forgot password object by password reset token
        forgot_password = ForgotPassword.objects.get(password_reset_token=request.data['password_reset_token'])
        #gets user object by email
        user = User.objects.get(email=forgot_password.email)

        #sets new password
        user.set_password(request.data['password'])
        user.save()

        #deletes forgot password object in the database
        forgot_password.delete()
        
        return HttpResponse("Password reset")

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

class ProfileAuthentication(generics.RetrieveAPIView):
    serializer_class = AuthenticationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return Authentication.objects.get(account=user)

class QRCode(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        #declarations
        user = self.request.user
        qrcode_image = f"qrcode{str(user.id)}.png"

        #generates uri
        uri = pyotp.totp.TOTP(settings.AUTHENTICATION_KEY).provisioning_uri(name=user.username, issuer_name="Vault Password")

        #generates qrcode with uri
        qrcode.make(uri).save(qrcode_image)

        os.chdir("..")
        #backend directory
        backend_directory = os.getcwd() + "\\Backend\\" + qrcode_image
        #frontend directory
        frontend_directory = os.getcwd() + "\\Frontend\\src\\assets\\" + qrcode_image
        #moves qrcode image from backend to assets folder in frontend
        os.rename(backend_directory, frontend_directory)

        return HttpResponse("QR Code generated")

class DeleteQRCode(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        #declarations
        user = self.request.user
        qrcode_image = f"qrcode{str(user.id)}.png"

        #frontend directory
        qrcode_directory = os.getcwd() + "\\Frontend\\src\\assets\\" + qrcode_image
        qrcode_image_file = os.path.isfile(qrcode_directory)

        #if qrcode exists, delete it
        if (qrcode_image_file):
            os.remove(qrcode_directory)
            return HttpResponse("QR Code deleted")

        return HttpResponse("QR Code does not exist")

class TwoFactorVerification(generics.CreateAPIView):
    serializer_class = AuthenticationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        #declarations
        user = self.request.user
        totp = pyotp.TOTP(settings.AUTHENTICATION_KEY)

        if totp.verify(request.data['authentication_code']):
            authentication = Authentication.objects.get(account=user)
            authentication.authenticated = True
            authentication.save()
            return HttpResponse("Authentication Verified")
        
        raise ValueError("Invalid Authentication Code")