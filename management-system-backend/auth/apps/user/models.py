from django.db import models
from apps.user_profile.models import UserProfile

# Create your models here.


class User(models.Model):

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    id_profile = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE)
