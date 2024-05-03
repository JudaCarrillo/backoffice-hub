from .models import User
from core.serializers import DynamicFieldsModelSerializer


class UserSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 'last_name', 'first_name', 'title', 'title_of_courtesy', 'birth_date',
            'hire_date', 'address', 'city', 'region', 'postal_code', 'country', 'home_phone', 'extension', 'photo', 'notes', 'email', 'password', 'is_active', 'reports_to', 'id_profile', 'created_at', 'updated_at'
        ]
