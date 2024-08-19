from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.vault_password),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view()), #TokenObtainPairView to get access and refresh tokens
    path('api/token/refresh/', TokenRefreshView.as_view()), #TokenRefreshView to refresh access token
    path('api/create-account/', views.CreateAccount.as_view())
]