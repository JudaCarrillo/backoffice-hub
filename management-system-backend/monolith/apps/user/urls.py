from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name='get users'),
    path('interservice/<str:email>', interservice, name='interservice'),
    path('<int:id>', get_user, name='get_user'),
    path('create', create, name='create'),
    path('update/<int:id>', update_user, name='update_user'),
    path('disabled/<int:id>', disabled, name='disabled'),
    path('to-report', users_to_report, name='users_to_report')
]
