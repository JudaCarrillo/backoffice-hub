from django.db import models

# Create your models here.


class Privilege(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    title = models.CharField(max_length=100, null=True)
    route = models.CharField(max_length=100, null=True)
    icon = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
