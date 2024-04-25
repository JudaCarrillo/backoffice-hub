from django.contrib.auth.hashers import check_password
from typing import Union

from apps.permission.models import Permission
from apps.privilege.models import Privilege

from apps.user.serializers import UserSerializer
from apps.privilege.serializers import PrivilegeSerializer
from apps.permission.serializers import PermissionSerializer

from apps.user.models import User


class LoginUseCase:

    def validate_password(self, raw_password: str, user: User):
        return user and check_password(raw_password, user.password)

    def validate_user(self, username: str, password: str) -> Union[User, None]:
        user = User.objects.get(username=username)

        if not self.validate_password(password, user):
            return None

        return user

    def run(self, username: str, password: str) -> dict:

        user = self.validate_user(username, password)

        if not user:
            return {'success': False, 'data': None, 'message': 'Invalid username or password'}

        serializer = UserSerializer(user)
        user = serializer.data

        enabled = user['is_active']
        if not enabled:
            return {'success': False, 'data': None, 'message': 'User not enabled'}

        id_profile = user['id_profile']
        if not id_profile:
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        permissions = Permission.objects.filter(id_profile=id_profile)
        if not permissions:
            return {'success': False, 'data': None, 'message': 'User Profile permissions not found'}
        permission_serializer = PermissionSerializer(permissions, many=True)

        data = permission_serializer.data
        id_privileges = [item['id_privilege'] for item in data]

        privileges = Privilege.objects.filter(id__in=id_privileges)
        if not privileges:
            return {'success': False, 'data': None, 'message': 'User Profile privileges not found'}
        privilege_serializer = PrivilegeSerializer(privileges, many=True)

        return {
            'success': True,
            'data': {
                'user': user,
                'privileges': privilege_serializer.data
            },
            'message': 'Login successful'
        }
