from ..models import Shippers
from core.serializers import DynamicFieldsModelSerializer


class ShipperSerializer (DynamicFieldsModelSerializer):

    class Meta:
        model = Shippers
        fields = [
            'id', 'company_name', 'phone'
        ]
