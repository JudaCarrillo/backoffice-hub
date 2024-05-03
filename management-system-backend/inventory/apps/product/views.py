from django.http import HttpResponse

import csv

from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from .models import Product
from .product_manager import ProductManager
from .serializers import ProductSerializer
vendor = ProductManager()


@api_view(['GET'])
def index(request):
    return Response(vendor.get_all())


@api_view(['GET'])
def get_by_id(request, id):
    return Response(vendor.get_by_id(id))


@swagger_auto_schema(
    methods=['POST'],
    request_body=ProductSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['POST'])
def create(request):
    return Response(vendor.create(**request.data))


@swagger_auto_schema(
    methods=['PUT'],
    request_body=ProductSerializer,
    responses={
        200: 'Ok',
        201: 'Created',
        400: 'Bad Request',
    }
)
@api_view(['PUT'])
def update(request, id):
    return Response(vendor.update(id, **request.data))


@api_view(['DELETE'])
def delete(request, id):
    return Response(vendor.delete(id))


@api_view(['GET'])
def export_to_csv(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    headers = ['id', 'name', 'price', 'stock', 'description',
               'created_at', 'updated_at', 'id_category', 'id_vendor']
    filename = "product_data.csv"

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    writer = csv.DictWriter(response, fieldnames=headers)
    writer.writeheader()

    for row in serializer.data:
        writer.writerow({header: row[header] for header in headers})

    return response
