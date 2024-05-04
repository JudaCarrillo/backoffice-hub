from django.db import models
from apps.category.models import Category
from apps.supplier.models import Supplier


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    stock = models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    id_vendor = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
