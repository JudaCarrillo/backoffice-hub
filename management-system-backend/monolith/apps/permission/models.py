from django.db import models
from apps.user_profile.models import UserProfile
from apps.privilege.models import Privilege


class Permission(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    id_profile = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE)
    id_privilege = models.ForeignKey(
        Privilege, on_delete=models.CASCADE)
