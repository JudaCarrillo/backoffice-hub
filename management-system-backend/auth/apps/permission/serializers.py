from rest_framework import serializers

from .models import Privilege
from .models import UserProfile


class PermissionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    id_profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    id_privilege = serializers.PrimaryKeyRelatedField(queryset=Privilege.objects.all())
