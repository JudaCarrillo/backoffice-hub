import csv
from django.http import HttpResponse

from apps.product.services import ProductService
from apps.order.order.services import OrderService


from .serializers import OrderDetailsSerializer
from .models import OrderDetails


class OrderDetailsService:
    def __init__(self):
        self.product_service = ProductService()
        self.order_service = OrderService()

    def get_all(self):
        orders = OrderDetails.objects.values(
            'id', 'unit_price', 'quantity', 'discount', 'order_id', 'product_id'
        )

        return {'success': True, 'data': orders, 'message': 'Order details found'}

    def get_by_id(self, id):
        order = self._order_exists('id', id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        serializer = OrderDetailsSerializer(order).data

        return {'success': True, 'data': serializer, 'message': 'Order detail found'}

    def _order_exists(self, field, value):
        try:
            order = OrderDetails.objects.get(**{field: value})
            return order
        except OrderDetails.DoesNotExist:
            return None

    def delete(self, id):
        order = self._order_exists('id', id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order detail not found'}

        order.delete()

        return {'success': True, 'data': None, 'message': 'Order detail deleted'}

    def export_to_csv(self, response: HttpResponse):
        orders = OrderDetails.objects.all()
        serializer = OrderDetailsSerializer(orders, many=True)
        headers = [
            'id', 'unit_price', 'quantity', 'discount', 'order_id', 'product_id'
        ]
        filename = 'order_details_data.csv'

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for order in serializer.data:
            writer.writerow({header: order[header] for header in headers})

        return response

    def create(self, request_data: dict):
        order_id = request_data.get('order_id')
        product_id = request_data.get('product_id')
        unit_price = float(request_data.get('unit_price'))
        quantity = int(request_data.get('quantity'))

        if not (order_id and product_id):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        order = self.order_service._order_exists('id', order_id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        product = self.product_service._product_exists('id', product_id)
        if not product:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        stock = product.units_in_stock

        if quantity > stock:
            return {'success': False, 'data': None, 'message': 'Quantity exceeds stock'}

        product.units_in_stock -= quantity
        product.save()

        OrderDetails.objects.create(
            unit_price=unit_price,
            discount=request_data.get('discount', 0),
            quantity=quantity,
            order_id=order,
            product_id=product
        )

        return {'success': True, 'data': None, 'message': 'Order detail created'}

    def update(self, id, request_data: dict):
        order = self._order_exists('id', id)

        if not order:
            return {'success': False, 'data': None, 'message': 'Order detail not found'}

        order_id = request_data.get('order_id')
        product_id = request_data.get('product_id')
        unit_price = float(request_data.get('unit_price'))
        quantity = int(request_data.get('quantity'))

        if not (order_id and product_id and quantity):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        order = self.order_service._order_exists('id', order_id)
        if not order:
            return {'success': False, 'data': None, 'message': 'Order not found'}

        product = self.product_service._product_exists('id', product_id)
        if not product:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        stock = product.units_in_stock

        if quantity > stock:
            return {'success': False, 'data': None, 'message': 'Quantity exceeds stock'}

        product.units_in_stock -= quantity
        product.save()

        order.unit_price = unit_price
        order.discount = request_data.get('discount', 0)
        order.quantity = quantity
        order.product_id = product
        order.order_id = order
        order.save()

        return {'success': True, 'data': None, 'message': 'Order detail updated'}
