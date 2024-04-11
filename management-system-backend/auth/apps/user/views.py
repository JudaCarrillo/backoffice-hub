from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from apps.user_profile.models import UserProfile

from .serializers import CustomUserSerializer
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
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['username', 'email', 'password', 'is_active', 'created_at'],
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'is_active': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
            'id_profile': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
    ), responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def create_user(request):
    id_profile = request.data.get('id_profile')
    profile = __validate_profile(id_profile)
    password = make_password(request.data['password'])

    request.data['id_profile'] = profile
    request.data['password'] = password
    return Response(user.create(**request.data))


def __validate_profile(id):
    try:
        profile = UserProfile.objects.get(id=id)
        return profile
    except UserProfile.DoesNotExist:
        return 'User Profile not found'


@swagger_auto_schema(
    methods=['PUT'],
    request_body=CustomUserSerializer,
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
