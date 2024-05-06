from django.db import models
from apps.product.models import Products
from apps.order.models import Orders


class OrderDetails(models.Model):
    id = models.AutoField(primary_key=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    discount = models.FloatField()
    order_id = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)

    class Meta:
        unique_together = [['order_id', 'product_id']]
