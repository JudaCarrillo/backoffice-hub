from rest_framework import serializers
from .models import Categories


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = '__all__'


class CustomCategorySerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()

    def create(self, validated_data):
        return Categories.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
