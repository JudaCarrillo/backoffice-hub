from rest_framework import serializers
from .models import Product

from apps.category.models import Category
from apps.vendor.models import Vendor


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class CustomProductSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.FloatField()
    stock = serializers.IntegerField()
    description = serializers.CharField()
    id_vendor = serializers.PrimaryKeyRelatedField(
        queryset=Vendor.objects.all(), write_only=True)
    id_category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True)

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.id_vendor = validated_data.get(
            'id_vendor', instance.id_vendor)
        instance.id_category = validated_data.get(
            'id_category', instance.id_category)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
