from .models import User
from .serializers import UserSerializer, CustomUserSerializer
from apps.user_profile.models import UserProfile

import datetime


class UserManager:
    def disabled(self, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return {'success': False, 'data': None,
                    'message': 'User not found'}

        user.is_active = False
        user.save()

        serializer = CustomUserSerializer(user)
        """ serializer = CustomUserSerializer(
            user, data=, partial=True)

        if not serializer.is_valid():
            return {'success': False, 'data': None,
                    'message': 'User not deleted'} """

        return {'success': True, 'data': serializer.data, 'message': 'User disabled'}

    def create(self, username: str, email: str, password: str, is_active: bool, id_profile: int):
        date = datetime.datetime.now()

        try:
            id_profile = UserProfile.objects.get(id=id_profile)
        except UserProfile.DoesNotExist:
            id_profile = None

        user = User.objects.create(
            username=username,
            email=email,
            password=password,
            is_active=is_active,
            created_at=date,
            id_profile=id_profile
        )

        serializer = CustomUserSerializer(user)
        return {'success': True, 'data': serializer.data, 'message': 'User created'}

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
