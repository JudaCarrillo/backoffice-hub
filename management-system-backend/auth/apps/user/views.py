from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from apps.user_profile.models import UserProfile

from .serializers import CustomUserSerializer, UserSerializer
from .models import User
from .user_manager import UserManager
user = UserManager()


@api_view(['GET'])
def index(request):
    return Response(user.get_all())


@api_view(['GET'])
def get_user(request, id):
    return Response(user.get_by_id(id))


@swagger_auto_schema(
    methods=['POST'],
    request_body=UserSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def create(request):
    if request.data.get('password'):
        password = make_password(request.data['password'])
        request.data['password'] = password

    return Response(user.create(**request.data))


@swagger_auto_schema(
    methods=['PUT'],
    request_body=UserSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['PUT'])
def update_user(request, id):
    if request.data.get('password'):
        password = make_password(request.data['password'])
        request.data['password'] = password

    return Response(user.update(id, **request.data))


@api_view(['POST'])
def disabled(request, id):
    return Response(user.disabled(id))
