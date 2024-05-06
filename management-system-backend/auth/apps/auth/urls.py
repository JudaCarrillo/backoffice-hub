from django.urls import path
from .views import *


urlpatterns = [
    path('login', index, name='login'),
    path('recovery-password', index, name='recovery-password'),

]
