from .models import User
from .serializers import UserSerializer, CustomUserSerializer

from django.core.exceptions import ValidationError


class UserManager:
    def create(self, username: str, email: str, password: str, is_active: bool, created_at: str, id_profile: int):

        payload = {}

        try:
            if User.objects.filter(username=username).exists():
                raise ValidationError(
                    'The username is already in use.', code='invalid')

            if User.objects.filter(email=email).exists():
                raise ValidationError(
                    'The email is already in use.', code='invalid')

            user = User.objects.create(
                username=username,
                email=email,
                password=password,
                is_active=is_active,
                created_at=created_at,
                id_profile=id_profile
            )

            payload = {'success': True, 'data': {
                'items': user}, 'message': 'User created'}

        except ValidationError as e:
            payload = {'success': False, 'data': None,
                       'message': str(e)}

        except Exception as e:
            payload = {'success': False, 'data': None,
                       'message': 'The user was not created. ' + str(e)}

        return payload

    def update(self, id, **extra_fields):
        payload = {}
        user: object = None

        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            print('User not found')
            return {'success': False, 'data': None,
                    'message': 'User not found'}

        serializer = CustomUserSerializer(
            user, data=extra_fields, partial=True)

        if serializer.is_valid():
            serializer.save()
            payload = {'success': True, 'data': {
                'items': serializer.data}, 'message': 'User updated'}
        else:
            payload = {'success': False, 'data': None,
                       'message': 'The user was not updated. ' + str(serializer.errors)}

        return payload

    def get_all(self):
        payload = {}
        try:
            users = User.objects.all()

            if not users:
                raise User.DoesNotExist

            serializer = UserSerializer(users, many=True)
            data = serializer.data
        
            id_profile = data['id_profile']
                

            payload = {'success': True,
                       'data': {'items': serializer.data},
                       'message': 'Users found'}

        except User.DoesNotExist:
            payload = {'success': False, 'data': None,
                       'message': 'Users not found'}

        return payload

    def get_by_id(self, id):
        payload = {}
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user)
            payload = {'success': True,
                       'data': {'items': serializer.data},
                       'message': 'User found'}

        except User.DoesNotExist:
            payload = {'success': False, 'data': None,
                       'message': 'User not found'}

        return payload
