from rest_framework import serializers
from .models import Suppliers
from core.serializers import DynamicFieldsModelSerializer


class SupplierSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Suppliers
        fields = ('id', 'name', 'email', 'direction', 'phone')


class CustomSupplierSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    direction = serializers.CharField()
    phone = serializers.CharField()

    def create(self, validated_data):
        return Suppliers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.direction = validated_data.get(
            'direction', instance.direction)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
