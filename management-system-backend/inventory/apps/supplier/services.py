import csv

from .serializers import SupplierSerializer
from .models import Suppliers


class SupplierService:

    def get_all(self):
        suppliers = Suppliers.objects.values(
            'id', 'company_name', 'contact_name', 'contact_title',
            'address', 'city', 'region', 'country', 'phone'
        )

        return {'success': True, 'data': suppliers, 'message': 'Suppliers found'}

    def get_by_id(self, id):
        supplier = self._supplier_exists('id', id)
        if not supplier:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        serializer = SupplierSerializer(supplier).data
        return {'success': True, 'data': serializer, 'message': 'Supplier found'}

    def _supplier_exists(self, field, value):
        try:
            supplier = Suppliers.objects.get(**{field: value})
            return supplier
        except Suppliers.DoesNotExist:
            return None

    def create(self, request_data):

        try:
            Suppliers.objects.create(
                company_name=request_data.get('company_name'),
                contact_name=request_data.get('contact_name'),
                contact_title=request_data.get('contact_title'),
                address=request_data.get('address'),
                city=request_data.get('city'),
                region=request_data.get('region'),
                postal_code=request_data.get('postal_code'),
                country=request_data.get('country'),
                phone=request_data.get('phone'),
                fax=request_data.get('fax'),
                home_page=request_data.get('home_page')
            )
        except Exception as e:
            return {'success': False, 'data': None, 'message': 'Error creating supplier. ' + str(e)}

        return {'success': True, 'data': None, 'message': 'Supplier created'}

    def delete(self, id):
        supplier = self._supplier_exists('id', id)
        if not supplier:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        supplier.delete()
        return {'success': True, 'data': None, 'message': 'Supplier deleted'}

    def update(self, id, request_data):
        supplier = self._supplier_exists('id', id)
        if not supplier:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        fields_to_update = ['company_name', 'contact_name', 'contact_title', 'address',
                            'city', 'region', 'postal_code', 'country', 'phone', 'fax', 'home_page']

        for field in fields_to_update:
            setattr(supplier, field, request_data.get(
                field, getattr(supplier, field)))

        supplier.save()
        return {'success': True, 'data': None, 'message': 'Supplier updated'}

    def export_to_csv(self, response):
        suppliers = Suppliers.objects.all()
        serializer = SupplierSerializer(suppliers, many=True)
        headers = ['id', 'company_name', 'contact_name', 'contact_title', 'address',
                   'city', 'region', 'postal_code', 'country', 'phone', 'fax', 'home_page']

        filename = "supplier_data.csv"

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for supplier in serializer.data:
            writer.writerow(supplier)

        return response
