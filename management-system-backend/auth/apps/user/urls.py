from django.urls import path
from .views import index, get_user, create, update_user, disabled


urlpatterns = [
    path('', index, name='index'),
    path('<int:id>', get_user, name='get_user'),
    path('create', create, name='create'),
    path('update/<int:id>', update_user, name='update_user'),
    path('disabled/<int:id>', disabled, name='disabled'),
]
