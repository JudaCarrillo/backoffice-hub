from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema


from .services import ShipperService

services = ShipperService()


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

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'success': False, 'data': None, 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
