from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .serialyzers import LoginSerializer
from apps.user.models import User
from .login_manager import LoginManager

login = LoginManager()


@swagger_auto_schema(
    methods=['POST'],
    request_body=LoginSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def index(request):
    raw_password = request.data.get('password')
    username = request.data.get('username')

    user = _get_user(username, raw_password)
    if not user:
        return Response({
            'success': False,
            'data': None,
            'message': 'User not found'
        }, status=400)

    return Response(login.main(user))


def _get_user(username: str, raw_password: str):
    try:
        user = User.objects.get(username=username)
        if check_password(raw_password, user.password):
            return user
        else:
            return None
    except User.DoesNotExist:
        return None
