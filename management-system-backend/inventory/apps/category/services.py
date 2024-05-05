import csv
from django.http import HttpResponse

from .serializers import CategorySerializer
from .models import Categories


class CategoryService:

    def get_all(self, base_url):
        categories = Categories.objects.values(
            'id', 'picture', 'name', 'description'
        )

        for category in categories:
            category['picture'] = f'{base_url}/{category.get("picture")}'

        return {'success': True, 'data': categories, 'message': 'Categories found'}

    def get_by_id(self, id, base_url):
        category = self._category_exists('id', id)
        if not category:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        serializer = CategorySerializer(category).data
        serializer['picture'] = f'{base_url}{serializer["picture"]}'

        return {'success': True, 'data': serializer, 'message': 'Category found'}

    def _category_exists(self, field, value):
        try:
            category = Categories.objects.get(**{field: value})
            return category
        except Categories.DoesNotExist:
            return None

    def create(self, request_files: dict, request_data: dict):

        name = request_data.get('name')
        description = request_data.get('description')
        picture = request_files.get('picture')

        if not (picture and name and description):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        try:
            Categories.objects.create(
                name=name,
                description=description,
                picture=picture
            )
        except Exception as e:
            return {'success': False, 'data': None, 'message': 'Error creating category. ' + str(e)}

        return {'success': True, 'data': None, 'message': 'Category created'}

    def delete(self, id):
        category = self._category_exists('id', id)

        if not category:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        category.delete()
        return {'success': True, 'data': None, 'message': 'Category deleted'}

    def update(self, id, request_files: dict, request_data: dict):
        category = self._category_exists('id', id)
        if not category:
            return {'success': False, 'data': None, 'message': 'Category not found'}

        if request_files.get('picture'):
            category.picture = request_files.get('picture')

        fields_to_update = [
            'name',
            'description',
        ]

        for field in fields_to_update:
            setattr(category, field, request_data.get(
                field, getattr(category, field)))

        category.save()
        return {'success': True, 'data': None, 'message': 'Category updated'}

    def export_to_csv(self, response: HttpResponse):
        categories = Categories.objects.all()
        serializer = CategorySerializer(categories, many=True)
        headers = ['id', 'name', 'description', 'picture']
        filename = "category_data.csv"

        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()

        for row in serializer.data:
            writer.writerow({header: row[header] for header in headers})

        return response
