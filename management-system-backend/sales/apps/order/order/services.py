import csv
import json
from django.http import HttpResponse

from .serializers import OrderSerializer
from ..models import *
from ..config.env import env_config

import requests


class OrderService:
    def get_all(self):
        orders = Orders.objects.values(
            'id', 'order_date', 'required_date', 'shipped_date', 'freight', 'ship_name', 'ship_address', 'ship_city', 'ship_region', 'ship_postal_code', 'ship_country', 'employee_id', 'customer_id', 'ship_via'
        )

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

    def _validate_user(self, email):
        END_POINT = env_config['MICRO']['INTERSERVICES']['ENDPOINT_VALIDATE_USER']
        API_KEY = env_config['MICRO']['INTERSERVICES']['AUTH_API_KEY']

        response = requests.get(
            url=f'{END_POINT}/{email}',
            headers={'api_key': f'{API_KEY}'}
        )

        try:
            response.raise_for_status()
            response_json = response.json()
            return response_json

        except requests.HTTPError as e:
            return {'success': False, 'message': f"HTTP error occurred: {e}"}

        except json.JSONDecodeError:
            return {'success': False, 'message': "Invalid JSON response from server"}

    def create(self, request_data: dict):
        email = request_data.get('email')
        customer_id = request_data.get('customer_id')
        ship_via = request_data.get('ship_via')

        if not (email and customer_id and ship_via):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        """ shipper = self._shipper_exists(ship_via)
        if not shipper:
            return {'success': False, 'data': None, 'message': 'Shipper not found'} """

        try:
            user = self._validate_user(email)

            return user
        except Exception as e:
            return {'success': False, 'data': None, 'message': f'{e}'}
