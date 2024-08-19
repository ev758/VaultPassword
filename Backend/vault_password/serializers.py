from django.contrib.auth.models import User
from vault_password.models import PasswordStorage
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PasswordStorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordStorage
        fields = '__all__'