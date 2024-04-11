from django.urls import path
from .views import login, index


urlpatterns = [
    path('', index, name='index'),
    path('login', login, name='login')
]
