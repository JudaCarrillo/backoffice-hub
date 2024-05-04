from .serializers import ProductSerializer, CustomProductSerializer
from .models import Products
from apps.supplier.models import Suppliers
from apps.category.models import Categories

import datetime


class ProductManager():

    def get_all(self):
        products = Products.objects.all()
        serializer = ProductSerializer(products, many=True)
        return {'success': True, 'data': serializer.data, 'message': 'Products found'}

    def get_by_id(self, id):
        try:
            product = Products.objects.get(id=id)
            serializer = ProductSerializer(product)
            return {'success': True, 'data': serializer.data, 'message': 'Product found'}
        except Products.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Product not found'}

    def create(self, name, price, stock, description, id_category, id_vendor):
        date = datetime.datetime.now()

        try:
            id_category = Categories.objects.get(id=id_category)
        except Categories.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        try:
            id_vendor = Suppliers.objects.get(id=id_vendor)
        except Suppliers.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

        product = Products.objects.create(
            name=name,
            price=price,
            stock=stock,
            description=description,
            created_at=date,
            updated_at=date,
            id_category=id_category,
            id_vendor=id_vendor
        )
        serializer = ProductSerializer(product)
        return {'success': True, 'data': serializer.data, 'message': 'Product created'}

    def update(self, id, **kwargs):
        try:
            product = Products.objects.get(id=id)
        except Products.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Product not found'}

        serializer = CustomProductSerializer(
            product, data=kwargs, partial=True)

        if serializer.is_valid():
            serializer.save()
            return {'success': True, 'data': serializer.data, 'message': 'Product updated'}
        else:
            return {'success': False, 'data': None, 'message': 'The product was not updated. ' + str(serializer.errors)}

    def delete(self, id):
        try:
            Products.objects.get(id=id).delete()
            return {'success': True, 'data': None, 'message': 'Product deleted'}
        except:
            return {'success': False, 'data': None, 'message': 'Product not found'}
