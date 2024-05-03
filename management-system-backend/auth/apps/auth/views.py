from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .serialyzers import LoginSerializer
from .services import LoginService

login = LoginService()


def get_base_url(request):
    HOST = request.META.get('HTTP_HOST')
    PROTOCOL = 'https' if 'HTTPS' in request.META.get(
        'SERVER_PROTOCOL') else 'http'
    return f'{PROTOCOL}://{HOST}'


@swagger_auto_schema(
    methods=['POST'],
    request_body=LoginSerializer,
    responses={
        200: 'Ok',
        400: 'Bad Request',
        500: 'Internal Server Error',
    }
)
@api_view(['POST'])
def index(request):

    BASE_URL = get_base_url(request)
    try:
        result = login.run(
            **request.data,
            base_url=BASE_URL
        )

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        print('::-> Auth service:', e)
        error_message = f'Internal Server Error'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
