from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .serializers import UserSerializer
from .user_manager import UserManager
from .services import UserServices

services = UserServices()
user = UserManager()


@swagger_auto_schema(
    methods=['GET'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['GET'])
def index(request):
    try:
        result = services.get_users()
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['GET'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['GET'])
def get_user(request, id):
    try:
        result = services.get_user_by_id(id)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['POST'],
    request_body=UserSerializer,
    responses={
        201: 'Created',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['POST'])
def create(request):
    try:
        response = services.create(**request.data)

        if not response.get('success'):
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['PUT'],
    request_body=UserSerializer,
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['PUT'])
def update_user(request, id):

    try:
        result = services.update(id, **request.data)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)

    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['POST'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['POST']) 
def disabled(request, id):
    try:
        result = services.disabled(id)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
