from core.serializers import DynamicFieldsModelSerializer
from .models import Products


class ProductSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Products
        fields = [
            'id',
            'name',
            'quantity_per_unit',
            'unit_price',
            'units_in_stock',
            'units_on_order',
            'reorder_level',
            'discontinued',
            'id_category',
            'id_supplier',
        ]
