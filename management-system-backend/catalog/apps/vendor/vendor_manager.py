from .serializers import VendorSerializer, CustomVendorSerializer
from .models import Vendor

import datetime


class VendorManager:

    def get_all(self):
        vendors = Vendor.objects.all()
        serializer = VendorSerializer(vendors, many=True)
        return {'success': True, 'data': serializer.data, 'message': 'Vendors found'}

    def get_by_id(self, id):
        try:
            vendor = Vendor.objects.get(id=id)
            serializer = VendorSerializer(vendor)
            return {'success': True, 'data': serializer.data, 'message': 'Vendor found'}
        except Vendor.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

    def create(self, name, email, direction, phone):
        date = datetime.datetime.now()
        vendor = Vendor.objects.create(
            name=name,
            email=email,
            direction=direction,
            phone=phone,
            created_at=date
        )
        serializer = VendorSerializer(vendor)
        return {'success': True, 'data': serializer.data, 'message': 'Vendor created'}

    def delete(self, id):
        try:
            Vendor.objects.get(id=id).delete()
            return {'success': True, 'data': None, 'message': 'Vendor deleted'}
        except:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

    def update(self, id, **extra_fields):
        try:
            vendor = Vendor.objects.get(id=id)
        except Vendor.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'Vendor not found'}

        serializer = CustomVendorSerializer(
            vendor, data=extra_fields, partial=True)

        if serializer.is_valid():
            serializer.save()
            return {'success': True, 'data': serializer.data, 'message': 'Vendor updated'}
        else:
            return {'success': False, 'data': None, 'message': 'The vendor was not updated. ' + str(serializer.errors)}
