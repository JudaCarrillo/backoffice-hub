from django.urls import path
from .order.views import *

urlpatterns = [
    path('', index, name='index'),
    path('<int:id>', get_by_id, name='get_by_id'),
    path('create', create, name='create'),
    path('delete/<int:id>', delete, name='delete'),
    path('update/<int:id>', update, name='update'),
    path('export', export_to_csv, name='export_to_csv'),
]
