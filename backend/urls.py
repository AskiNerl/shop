from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', views.register),
    path('api/login/', views.login_view),
]
