from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileServices:
    def get_by_id(self, id: int) -> dict:
        try:
            product = UserProfile.objects.get(id=id)
            serializer = UserProfileSerializer(product)
            return {'success': True, 'data': serializer.data, 'message': 'User Profile found'}
        except:
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

    def get_all(self) -> dict:
        profiles = UserProfile.objects.filter(is_active=True)
        serializer = UserProfileSerializer(profiles, many=True)
        return {'success': True, 'data':  serializer.data, 'message': 'User Profiles found'}
