from django.db import models
from django.contrib.auth.models import User

class PasswordStorage(models.Model):
    storage_id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=2083, blank=True, null=True)
    website_name = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    username = models.CharField(max_length=50)
    stored_password = models.CharField(max_length=150)
    note = models.TextField(blank=True, null=True)
    account = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'password_storage'

class Authentication(models.Model):
    authentication_id = models.AutoField(primary_key=True)
    authenticated = models.BooleanField(default=False)
    account = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'authentication'

class ForgotPassword(models.Model):
    email = models.EmailField()
    password_reset_token = models.CharField(max_length=100)
    account = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'forgot_password'