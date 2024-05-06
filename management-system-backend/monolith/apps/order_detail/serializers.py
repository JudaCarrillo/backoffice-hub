from .models import OrderDetails
from core.serializers import DynamicFieldsModelSerializer


class OrderDetailsSerializer (DynamicFieldsModelSerializer):

    class Meta:
        model = OrderDetails
        fields = [
            'id', 'unit_price', 'quantity', 'discount', 'order_id', 'product_id'
        ]
