from ..models import Orders
from core.serializers import DynamicFieldsModelSerializer


class OrderSerializer (DynamicFieldsModelSerializer):

    class Meta:
        model = Orders
        fields = [
            'id', 'order_date', 'required_date', 'shipped_date', 'freight', 'ship_name', 'ship_address', 'ship_city', 'ship_region', 'ship_postal_code', 'ship_country', 'employee_id', 'customer_id', 'ship_via'
        ]
