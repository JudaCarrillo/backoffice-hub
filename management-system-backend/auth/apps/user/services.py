import datetime
from django.contrib.auth.hashers import make_password

from .models import User, UserProfile
from .serializers import UserSerializer, CustomUserSerializer


class UserServices:

    def get_all(self) -> dict:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return {'success': True, 'data': serializer.data, 'message': 'Users found'}

    def get_by_id(self, id) -> dict:
        user = self._user_exists(id)
        if not user.get('success'):
            return {'success': False, 'data': None, 'message': 'User not found'}

        user = user.get('data')
        serializer = UserSerializer(user)
        return {'success': True, 'data': serializer.data, 'message': 'User found'}

    def create(self, username: str, email: str, password: str, is_active: bool, id_profile: int) -> dict:

        if not self._username_exists(username):
            return {'success': False, 'data': None, 'message': 'User already exists'}

        if not self._profile_exists(id_profile):
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        date = datetime.datetime.now()
        password = self._hash_password(password)

        user = User.objects.create(
            username=username,
            email=email,
            password=password,
            is_active=is_active,
            created_at=date,
            id_profile=id_profile
        )

        serializer = UserSerializer(user)
        return {'success': True, 'data': serializer.data, 'message': 'User created'}

    def _hash_password(self, password):
        return make_password(password)

    def _profile_exists(self, id_profile):
        try:
            UserProfile.objects.get(id=id_profile)
            return True
        except UserProfile.DoesNotExist:
            return False

    def _username_exists(self, value_to_validate: str):
        try:
            User.objects.get(username=value_to_validate)
            return False
        except User.DoesNotExist:
            return True

    def update(self, id: int, username: str, email: str, password: str, is_active: bool, id_profile: int) -> dict:

        user = self._user_exists(id)
        if not user.get('success'):
            return {'success': False, 'data': None, 'message': 'User not found'}

        if User.objects.filter(username=username).exclude(id=id).exists():
            return {'success': False, 'data': None, 'message': 'Username is already in use'}

        if not self._profile_exists(id_profile):
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        password = self._hash_password(password)

        data = {
            'username': username,
            'email': email,
            'password': password,
            'is_active': is_active,
            'id_profile': id_profile
        }

        try:
            serializer = CustomUserSerializer(
                user.get('data'), data=data, partial=True)

            if not serializer.is_valid():
                return {'success': False, 'data': None, 'message': 'The user was not updated. ' + str(serializer.errors)}

            serializer.save()
            return {'success': True, 'data': serializer.data, 'message': 'User updated'}

        except Exception as e:
            return {'success': False, 'data': None, 'message': 'The user was not updated. ' + str(e)}

    def _user_exists(self, id: int):
        try:
            user = User.objects.get(id=id)
            return {'success': True, 'data': user}
        except User.DoesNotExist:
            return {'success': False, 'data': None}

    def disabled(self, id: int):

        user = self._user_exists(id)
        if not user.get('success'):
            return {'success': False, 'data': None, 'message': 'User not found'}

        user = user.get('data')
        user.is_active = False
        user.save()

        serializer = UserSerializer(user)
        return {'success': True, 'data': serializer.data, 'message': 'User disabled'}
