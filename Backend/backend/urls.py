from django.contrib import admin
from django.urls import path, include
from vault_password import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('vault_password.urls'))
]
