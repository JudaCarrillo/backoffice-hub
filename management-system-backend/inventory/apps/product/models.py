from django.db import models
from apps.category.models import Categories
from apps.supplier.models import Suppliers


class Products(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40, db_index=True)
    quantity_per_unit = models.CharField(max_length=20)
    unit_price = models.FloatField()
    units_in_stock = models.SmallIntegerField()
    units_on_order = models.SmallIntegerField()
    reorder_level = models.SmallIntegerField()
    discontinued = models.BooleanField()
    id_category = models.ForeignKey(Categories, on_delete=models.PROTECT)
    id_supplier = models.ForeignKey(Suppliers, on_delete=models.PROTECT)

    def __str__(self):
        return self.name
