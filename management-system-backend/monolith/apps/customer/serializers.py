from .models import Customers
from core.serializers import DynamicFieldsModelSerializer


class CustomerSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Customers
        fields = [
            'id', 'company_name', 'contact_name', 'contact_title', 'address',
            'city', 'region', 'postal_code', 'country', 'phone', 'fax'
        ]
