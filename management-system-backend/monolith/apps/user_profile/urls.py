from django.urls import path
from .views import index, get_profile

urlpatterns = [
    path('', index, name='index'),
    path('<int:id>', get_profile, name='get_profile'),
]
