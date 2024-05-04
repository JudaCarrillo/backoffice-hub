from django.db import models


class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, db_index=True)
    description = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='fields/categories/')

    def __str__(self):
        return self.name
