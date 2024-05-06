from django.urls import path
from .shipper.views import index, get_by_id

urlpatterns = [
    path('', index, name='index'),
    path('<int:id>', get_by_id, name='get_by_id'),
]
