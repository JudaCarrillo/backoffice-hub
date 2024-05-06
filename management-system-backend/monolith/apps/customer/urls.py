from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('create', create, name='create'),
    path('export', export_to_csv, name='export_to_csv'),
    path('delete/<str:id>', delete, name='delete'),
    path('update/<str:id>', update, name='update'),
    path('<str:id>', get_by_id, name='get_by_id'),
]
