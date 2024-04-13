from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

import csv

from .category_manager import CategoryManager
from .models import Category
from .serializers import CustomCategorySerializer, CategorySerializer
category = CategoryManager()


@api_view(['GET'])
def index(request):
    return Response(category.get_all())


@api_view(['GET'])
def get_by_id(request, id):
    return Response(category.get_by_id(id))


@api_view(['DELETE'])
def delete(request, id):
    return Response(category.delete(id))


@swagger_auto_schema(
    methods=['POST'],
    request_body=CategorySerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def create(request):
    return Response(category.create(**request.data))


@swagger_auto_schema(
    methods=['PUT'],
    request_body=CategorySerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['PUT'])
def update(request, id):
    return Response(category.update(id, **request.data))


@api_view(['GET'])
def export_to_csv(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    headers = ['id', 'name', 'description', 'created_at']
    filename = "category_data.csv"

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    writer = csv.DictWriter(response, fieldnames=headers)
    writer.writeheader()

    for row in serializer.data:
        writer.writerow({header: row[header] for header in headers})

    return response
