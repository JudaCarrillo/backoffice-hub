from rest_framework import serializers
from .models import User
from apps.user_profile.models import UserProfile


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class CustomUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    is_active = serializers.BooleanField()
    updated_at = serializers.DateTimeField()
    id_profile = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(), write_only=True)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get(
            'username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.is_active = validated_data.get(
            'is_active', instance.is_active)
        instance.updated_at = validated_data.get(
            'updated_at', instance.updated_at)
        instance.id_profile = validated_data.get('id_profile')
        instance.save()
        return instance
