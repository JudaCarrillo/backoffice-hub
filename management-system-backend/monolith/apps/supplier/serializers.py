from .models import Suppliers
from core.serializers import DynamicFieldsModelSerializer


class SupplierSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Suppliers
        fields = [
            'id', 'company_name', 'contact_name', 'contact_title', 'address',
            'city', 'region', 'postal_code', 'country', 'phone', 'fax', 'home_page'
        ]
