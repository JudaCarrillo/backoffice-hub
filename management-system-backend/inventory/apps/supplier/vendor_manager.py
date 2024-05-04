from .serializers import SupplierSerializer, CustomSupplierSerializer
from .models import Suppliers

import datetime


class VendorManager:

    def get_all(self):
        vendors = Suppliers.objects.all()
        serializer = SupplierSerializer(vendors, many=True)
        return {'success': True, 'data': serializer.data, 'message': 'Vendors found'}

    def get_by_id(self, id):
        try:
            vendor = Suppliers.objects.get(id=id)
            serializer = SupplierSerializer(vendor)
            return {'success': True, 'data': serializer.data, 'message': 'Vendor found'}
        except Supplier.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

    def create(self, name, email, direction, phone):
        date = datetime.datetime.now()
        vendor = Suppliers.objects.create(
            name=name,
            email=email,
            direction=direction,
            phone=phone,
            created_at=date
        )
        serializer = SupplierSerializer(vendor)
        return {'success': True, 'data': serializer.data, 'message': 'Vendor created'}

    def delete(self, id):
        try:
            Suppliers.objects.get(id=id).delete()
            return {'success': True, 'data': None, 'message': 'Vendor deleted'}
        except:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

    def update(self, id, **extra_fields):
        try:
            vendor = Suppliers.objects.get(id=id)
        except Suppliers.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

        serializer = CustomSupplierSerializer(
            vendor, data=extra_fields, partial=True)

        if serializer.is_valid():
            serializer.save()
            return {'success': True, 'data': serializer.data, 'message': 'Vendor updated'}
        else:
            return {'success': False, 'data': None, 'message': 'The vendor was not updated. ' + str(serializer.errors)}
