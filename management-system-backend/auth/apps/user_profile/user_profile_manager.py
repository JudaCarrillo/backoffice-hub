from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileManager:
    def get_all(self):
        payload = {}

        try:
            users = UserProfile.objects.all()

            if not users:
                raise UserProfile.DoesNotExist

            serializer = UserProfileSerializer(users, many=True)
            payload = {'success': True,
                       'data': {'items': serializer.data},
                       'message': 'Users found'}

        except UserProfile.DoesNotExist:
            payload = {'success': False, 'data': None,
                       'message': 'There are not user profiles '}

        return payload

    def get_by_id(self, id):
        payload = {}
        try:
            user = UserProfile.objects.get(id=id)
            serializer = UserProfileSerializer(user)
            payload = {'success': True,
                       'data': {'items': serializer.data},
                       'message': 'User found'}

        except UserProfile.DoesNotExist:
            payload = {'success': False, 'data': None,
                       'message': 'User Profile not found'}

        return payload
