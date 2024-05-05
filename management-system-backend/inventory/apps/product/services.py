import csv

from .serializers import ProductSerializer
from .models import Products

from apps.supplier.models import Suppliers
from apps.category.models import Categories


class ProductService():

    def get_all(self):
        products = Products.objects.values(
            'id', 'name', 'quantity_per_unit', 'unit_price', 'units_in_stock',
            'units_on_order', 'reorder_level', 'discontinued',
        )

        return {'success': True, 'data': products, 'message': 'Products found'}

    def get_by_id(self, id):
        product = self._product_exists('id', id)
        if not product:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        serializer = ProductSerializer(product).data
        return {'success': True, 'data': serializer, 'message': 'Product found'}

    def _product_exists(self, field, value):
        try:
            product = Products.objects.get(**{field: value})
            return product
        except Products.DoesNotExist:
            return None

    def create(self, request_data: dict):
        name = request_data.get('name')
        quantity_per_unit = request_data.get('quantity_per_unit')
        unit_price = request_data.get('unit_price')
        units_in_stock = request_data.get('units_in_stock')
        units_on_order = request_data.get('units_on_order')
        reorder_level = request_data.get('reorder_level')
        discontinued = request_data.get('discontinued')
        discontinued = True if discontinued == 'true' else False
        id_category = request_data.get('id_category')
        id_supplier = request_data.get('id_supplier')

        if not (id_category and id_supplier):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        category = self._category_exists('id', id_category)
        if not category:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        supplier = self._supplier_exists('id', id_supplier)
        if not supplier:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        try:
            Products.objects.create(
                name=name,
                quantity_per_unit=quantity_per_unit,
                unit_price=unit_price,
                units_in_stock=units_in_stock,
                units_on_order=units_on_order,
                reorder_level=reorder_level,
                discontinued=discontinued,
                id_category=category,
                id_supplier=supplier
            )
        except Exception as e:
            return {'success': False, 'data': None, 'message': 'Error creating product. ' + str(e)}

        return {'success': True, 'data': None, 'message': 'Product created'}

    def _category_exists(self, field, value):
        try:
            category = Categories.objects.get(**{field: value})
            return category
        except Categories.DoesNotExist:
            return None

    def _supplier_exists(self, field, value):
        try:
            supplier = Suppliers.objects.get(**{field: value})
            return supplier
        except Suppliers.DoesNotExist:
            return None

    def update(self, id, request_data: dict):
        product = self._product_exists('id', id)
        if not product:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        id_category = request_data.get('id_category')
        id_supplier = request_data.get('id_supplier')

        if not (id_category and id_supplier):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        category = self._category_exists('id', id_category)
        if not category:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        supplier = self._supplier_exists('id', id_supplier)
        if not supplier:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        fields_to_update = [
            'name',
            'quantity_per_unit',
            'unit_price',
            'units_in_stock',
            'units_on_order',
            'reorder_level',
            'discontinued',
        ]

        for field in fields_to_update:
            setattr(product, field, request_data.get(
                field or getattr(product, field)))

        product.id_category = category
        product.id_supplier = supplier
        product.save()

        return {'success': True, 'data': None, 'message': 'Product updated'}

    def disabled(self, id):
        product = self._product_exists('id', id)
        if not product:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        product.discontinued = True
        product.save()

        return {'success': True, 'data': None, 'message': 'Product disabled'}

    def export_to_csv(self, response):
        products = Products.objects.all()
        serializer = Products(products, many=True)
        headers = ['name', 'quantity_per_unit', 'unit_price', 'units_in_stock',
                   'units_on_order', 'reorder_level', 'discontinued', 'id_category',
                   'id_supplier']
        filename = "product_data.csv"

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for row in serializer.data:
            writer.writerow({header: row[header] for header in headers})

        return response
