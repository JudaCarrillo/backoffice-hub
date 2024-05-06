from rest_framework import serializers
from .models import Categories
from core.serializers import DynamicFieldsModelSerializer


class CategorySerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Categories
        fields = [
            'id', 'name', 'description', 'picture'
        ]
