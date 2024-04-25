from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .serialyzers import LoginSerializer
from .login_use_case import LoginUseCase

login = LoginUseCase()


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
    try:
        raw_password = request.data.get('password')
        username = request.data.get('username')

        result = login.run(username, raw_password)

        if not result.get('success'):
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f'Internal Server Error: {e}'
        return Response({'success': False, 'data': None, 'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
