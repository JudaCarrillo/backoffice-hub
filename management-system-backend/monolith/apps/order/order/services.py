import csv
from django.http import HttpResponse

from apps.user.services import UserServices
from apps.customer.services import CustomerService


from .config.constants import constants
from .serializers import OrderSerializer
from ..models import *


class OrderService:
    def __init__(self):
        self.user_service = UserServices()
        self.customer_service = CustomerService()

    def get_all(self):
        orders = Orders.objects.values(
            'id', 'order_date', 'required_date', 'shipped_date', 'freight', 'ship_name', 'ship_address', 'ship_city', 'ship_region', 'ship_postal_code', 'ship_country', 'employee_id', 'customer_id', 'ship_via'
        )

        for order in orders:
            customer = order['customer_id']
            employee = order['employee_id']
            order['name'] = f'{customer} - {employee}'

        return {'success': True, 'data': orders, 'message': 'Orders found'}

    def get_by_id(self, id):
        order = self._order_exists('id', id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        serializer = OrderSerializer(order).data

        return {'success': True, 'data': serializer, 'message': 'Order found'}

    def _order_exists(self, field, value):
        try:
            order = Orders.objects.get(**{field: value})
            return order
        except Orders.DoesNotExist:
            return None

    def delete(self, id):
        order = self._order_exists('id', id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        order.delete()

        return {'success': True, 'data': None, 'message': 'Order deleted'}

    def export_to_csv(self, response: HttpResponse):
        orders = Orders.objects.all()
        serializer = OrderSerializer(orders, many=True)
        headers = [
            'id', 'order_date', 'required_date', 'shipped_date', 'freight', 'ship_name', 'ship_address', 'ship_city', 'ship_region', 'ship_postal_code', 'ship_country', 'employee_id', 'customer_id', 'ship_via'
        ]
        filename = 'orders_data.csv'

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for order in serializer.data:
            writer.writerow({header: order[header] for header in headers})

        return response

    def create(self, request_data: dict):
        email = request_data.get('email')
        customer_id = request_data.get('customer_id')
        ship_via = request_data.get('ship_via')

        if not (email and customer_id and ship_via):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        shipper = self._shipper_exists(ship_via)
        if not shipper:
            return {'success': False, 'data': None, 'message': 'Shipper not found'}

        user = self.user_service._user_exists('email', email)
        if not user:
            user = self.user_service._user_exists(
                'id', constants['EMPLOYEE_ADMIN'])

        customer = self.customer_service._customer_exists('id', customer_id)
        if not customer:
            return {'success': False, 'data': None, 'message': 'Customer not found'}

        Orders.objects.create(
            order_date=request_data.get('order_date'),
            required_date=request_data.get('required_date'),
            shipped_date=request_data.get('shipped_date'),
            freight=request_data.get('freight'),
            ship_name=request_data.get('ship_name'),
            ship_address=request_data.get('ship_address'),
            ship_city=request_data.get('ship_city'),
            ship_region=request_data.get('ship_region'),
            ship_postal_code=request_data.get('ship_postal_code'),
            ship_country=request_data.get('ship_country'),
            employee_id=user,
            customer_id=customer,
            ship_via=shipper
        )

        return {'success': True, 'data': None, 'message': 'Order created'}

    def update(self, id, request_data: dict):
        order = self._order_exists('id', id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        email = request_data.get('email')
        customer_id = request_data.get('customer_id')
        ship_via = request_data.get('ship_via')

        if not (email and customer_id and ship_via):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        shipper = self._shipper_exists(ship_via)
        if not shipper:
            return {'success': False, 'data': None, 'message': 'Shipper not found'}

        user = self.user_service._user_exists('email', email)
        if not user:
            user = self.user_service._user_exists(
                'id', constants['EMPLOYEE_ADMIN'])

        customer = self.customer_service._customer_exists('id', customer_id)
        if not customer:
            return {'success': False, 'data': None, 'message': 'Customer not found'}

        fields_to_update = [
            'order_date', 'required_date', 'shipped_date', 'freight', 'ship_name', 'ship_address',
            'ship_city', 'ship_region', 'ship_postal_code', 'ship_country',
        ]

        for field in fields_to_update:
            setattr(order, field, request_data.get(
                field, getattr(order, field)))

        order.employee_id = user
        order.customer_id = customer
        order.ship_via = shipper

        order.save()

        return {'success': True, 'data': None, 'message': 'Order updated'}

    def _shipper_exists(self, id):
        try:
            shipper = Shippers.objects.get(id=id)
            return shipper
        except Shippers.DoesNotExist:
            return None
