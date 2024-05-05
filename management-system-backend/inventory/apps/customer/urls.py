from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('<str:id>', get_by_id, name='get_by_id'),
    path('create', create, name='create'),
    path('delete/<str:id>', delete, name='delete'),
    path('update/<str:id>', update, name='update'),
    path('export', export_to_csv, name='export_to_csv'),
]
