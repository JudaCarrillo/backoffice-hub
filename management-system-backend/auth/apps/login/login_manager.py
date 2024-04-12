from apps.permission.models import Permission
from apps.privilege.models import Privilege

from apps.user.serializers import UserSerializer
from apps.privilege.serializers import PrivilegeSerializer
from apps.permission.serializers import PermissionSerializer


class LoginManager:

    def main(self, user):
        serializer = UserSerializer(user)
        user = serializer.data

        enabled = user['is_active']
        if not enabled:
            self.handlerError('User not enabled')

        id_profile = user['id_profile']
        if not id_profile:
            self.handlerError('User Profile not found')

        permissions = Permission.objects.filter(id_profile=id_profile)
        if not permissions:
            self.handlerError('User Profile permissions not found')
        permission_serializer = PermissionSerializer(permissions, many=True)

        data = permission_serializer.data
        id_privileges = [item['id_privilege'] for item in data]

        privileges = Privilege.objects.filter(id__in=id_privileges)
        if not privileges:
            self.handlerError('User Profile privileges not found')
        privilege_serializer = PrivilegeSerializer(privileges, many=True)

        payload = {
            'success': True,
            'data': {
                'user': user,
                'permissions': permission_serializer.data,
                'privileges': privilege_serializer.data
            },
            'message': 'Login successful'
        }
        return payload

    def handlerError(self, error):
        return {'success': False, 'data': None, 'message': error}