from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.vault_password),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view()), #TokenObtainPairView to get access and refresh tokens
    path('api/token/refresh/', TokenRefreshView.as_view()), #TokenRefreshView to refresh access token
    path('api/create-account/', views.CreateAccount.as_view()),
    path('api/add-password/', views.AddPassword.as_view()),
    path('api/password-storage/', views.PasswordStorageList.as_view()),
    path('api/modal-password-storage/<int:pk>/', views.ModalPasswordStorage.as_view()),
    path('api/update-password-storage/<int:pk>/', views.UpdatePasswordStorage.as_view()),
    path('api/profile/', views.Profile.as_view()),
    path('api/profile/update/<int:pk>/', views.Profile.as_view()),
    path('api/delete-account/<int:pk>/', views.Profile.as_view())
]