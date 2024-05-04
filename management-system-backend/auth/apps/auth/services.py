from django.contrib.auth.hashers import check_password
from typing import Union

from apps.privilege.models import Privilege
from apps.privilege.serializers import PrivilegeSerializer
from apps.user.models import User


class LoginService:

    def validate_password(self, raw_password: str, password: str) -> bool:
        return check_password(raw_password, password)

    def validate_credentials(self, email: str, password: str) -> Union[dict, None]:
        try:
            user = User.objects.values(
                'email', 'photo', 'is_active', 'id_profile', 'password', 'first_name',
            ).get(email=email)

        except User.DoesNotExist:
            return None

        if not self.validate_password(password, user.get('password')):
            return None

        return user

    def run(self, email: str, password: str, base_url: str) -> dict:

        user = self.validate_credentials(email, password)
        if not user:
            return {'success': False, 'data': None, 'message': 'Invalid email or password'}

        if not user.get('is_active'):
            return {'success': False, 'data': None, 'message': 'User not enabled'}

        privileges = Privilege.objects.prefetch_related('permission_set').filter(
            permission__id_profile=user.get('id_profile')
        ).values('name', 'title', 'route', 'icon')

        privileges = PrivilegeSerializer(privileges,
                                         many=True,
                                         fields={'name', 'title', 'route', 'icon'}).data

        user['name'] = user['first_name']
        user['photo'] = f'{base_url}/{user.get("photo")}'
        user.pop('password')
        user.pop('id_profile')

        return {
            'success': True,
            'data': {
                'user': user,
                'privileges': privileges
            },
            'message': 'Login successful'
        }
