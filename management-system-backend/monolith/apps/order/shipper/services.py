from .serializers import ShipperSerializer
from ..models import *


class ShipperService:
    def get_all(self):
        shippers = Shippers.objects.values(
            'id', 'company_name', 'phone',
        )

        for shipper in shippers:
            shipper['name'] = shipper['company_name']

        return {'success': True, 'data': shippers, 'message': 'Orders found'}

    def get_by_id(self, id):
        shipper = self._shipper_exists('id', id)
        if not shipper:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        serializer = ShipperSerializer(shipper).data

        return {'success': True, 'data': serializer, 'message': 'Order found'}

    def _shipper_exists(self, field, value):
        try:
            shipper = Shippers.objects.get(**{field: value})
            return shipper
        except Shippers.DoesNotExist:
            return None
