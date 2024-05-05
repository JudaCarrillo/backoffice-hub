from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema


from .services import ProductService
from .serializers import ProductSerializer

services = ProductService()


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
        result = services.get_all()
        return Response(result)
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
def get_by_id(request, id):
    try:
        result = services.get_by_id(id)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['PATCH'],
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['PATCH'])
def delete(request, id):
    try:
        result = services.disabled(id)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['POST'],
    request_body=ProductSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def create(request):
    try:
        result = services.create(
            request_data=request.data
        )

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=['PUT'],
    request_body=ProductSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['PUT'])
def update(request, id):
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
def export_to_csv(request):
    response = HttpResponse(content_type='text/csv')
    result = services.export_to_csv(response)
    return result
