import csv

from .serializers import CustomerSerializer
from .models import Customers


class CustomerService:

    def get_all(self):
        customers = Customers.objects.values(
            'id', 'company_name', 'contact_name', 'contact_title',
            'city', 'country', 'phone',
        )

        return {'success': True, 'data': customers, 'message': 'Suppliers found'}

    def get_by_id(self, id):
        customer = self._customer_exists('id', id)
        if not customer:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        serializer = CustomerSerializer(customer).data
        return {'success': True, 'data': serializer, 'message': 'Supplier found'}

    def _customer_exists(self, field, value):
        try:
            customer = Customers.objects.get(**{field: value})
            return customer
        except Customers.DoesNotExist:
            return None

    def create(self, request_data):

        try:
            Customers.objects.create(
                id=request_data.get('id'),
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
            )
        except Exception as e:
            return {'success': False, 'data': None, 'message': 'Error creating supplier. ' + str(e)}

        return {'success': True, 'data': None, 'message': 'Supplier created'}

    def delete(self, id):
        customer = self._customer_exists('id', id)
        if not customer:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        customer.delete()
        return {'success': True, 'data': None, 'message': 'Supplier deleted'}

    def update(self, id, request_data):
        customer = self._customer_exists('id', id)
        if not customer:
            return {'success': False, 'data': None, 'message': 'Supplier not found'}

        fields_to_update = ['company_name', 'contact_name', 'contact_title', 'address',
                            'city', 'region', 'postal_code', 'country', 'phone', 'fax']

        for field in fields_to_update:
            setattr(customer, field, request_data.get(
                field, getattr(customer, field)))

        customer.save()
        return {'success': True, 'data': None, 'message': 'Supplier updated'}

    def export_to_csv(self, response):
        customers = Customers.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        headers = ['id', 'company_name', 'contact_name', 'contact_title', 'address',
                   'city', 'region', 'postal_code', 'country', 'phone', 'fax',]

        filename = "customer_data.csv"

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for customer in serializer.data:
            writer.writerow(customer)

        return response
