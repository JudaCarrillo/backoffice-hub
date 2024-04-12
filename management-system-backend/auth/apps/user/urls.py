from django.urls import path
from .views import index, get_user, create_user, update_user


urlpatterns = [
    path('', index, name='index'),
    path('<int:id>', get_user, name='get_user'),
    path('create', create_user, name='create_user'),
    path('update/<int:id>', update_user, name='update_user'),

    # path('login', login, name='login')
]
