from .models import Privilege
from core.serializers import DynamicFieldsModelSerializer


class PrivilegeSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Privilege
        fields = ['id', 'name', 'description',
                  'title', 'route', 'icon', 'created_at']
