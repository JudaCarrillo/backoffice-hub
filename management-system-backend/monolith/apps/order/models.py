from django.db import models
from apps.customer.models import Customers
from apps.user.models import User


class Shippers(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=40)
    phone = models.CharField(max_length=24)


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    order_date = models.DateField()
    required_date = models.DateField()
    shipped_date = models.DateField()
    freight = models.FloatField()
    ship_name = models.CharField(max_length=40)
    ship_address = models.CharField(max_length=60)
    ship_city = models.CharField(max_length=15)
    ship_region = models.CharField(max_length=15)
    ship_postal_code = models.CharField(max_length=10)
    ship_country = models.CharField(max_length=15)
    employee_id = models.ForeignKey(User, on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customers, on_delete=models.CASCADE)
    ship_via = models.ForeignKey('Shippers', on_delete=models.CASCADE)
