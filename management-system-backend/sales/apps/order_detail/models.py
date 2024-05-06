from django.db import models


class OrderDetails(models.Model):
    id = models.AutoField(primary_key=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    discount = models.FloatField()
    order_id = models.IntegerField(db_index=True)
    product_id = models.IntegerField(db_index=True)

    class Meta:
        unique_together = [['order_id', 'product_id']]
