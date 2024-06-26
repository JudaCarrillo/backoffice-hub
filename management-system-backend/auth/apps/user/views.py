from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .serializers import UserSerializer
from .services import UserServices
from .guards import Guard

guard = Guard()
services = UserServices()


def get_base_url(request):
    HOST = request.META.get('HTTP_HOST')
    PROTOCOL = 'https' if 'HTTPS' in request.META.get(
        'SERVER_PROTOCOL') else 'http'
    return f'{PROTOCOL}://{HOST}'


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
    BASE_URL = get_base_url(request)
    try:
        result = services.get_all(BASE_URL)
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    BASE_URL = get_base_url(request)
    try:
        result = services.get_by_id(id, BASE_URL)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        result = services.create(
            request_files=request.FILES,
            request_data=request.data
        )

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': f'Internal Server Error {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        result = services.update(
            id,
            request_files=request.FILES,
            request_data=request.data
        )

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': f'Internal Server Error: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['PATCH'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['PATCH'])
def disabled(request, id):
    try:
        result = services.disabled(id)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['GET'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['GET'])
def users_to_report(request):
    try:
        result = services.get_users_to_report()

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['GET'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['GET'])
def interservice(request, email):
    is_valid = guard.api_key_check(request)

    if not is_valid:
        return Response({'success': False, 'data': None, 'message': 'Invalid API Key'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        result = services.interservice(email)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
