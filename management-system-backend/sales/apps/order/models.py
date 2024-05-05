from django.db import models


class Shippers(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=40)
    phone = models.CharField(max_length=24)


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    order_date = models.DateField()
    required_date = models.DateField()
    shipped_date = models.DateField()
    freight = models.DecimalField(max_digits=10, decimal_places=2)
    ship_name = models.CharField(max_length=40)
    ship_address = models.CharField(max_length=60)
    ship_city = models.CharField(max_length=15)
    ship_region = models.CharField(max_length=15)
    ship_postal_code = models.CharField(max_length=10)
    ship_country = models.CharField(max_length=15)
    employee_id = models.IntegerField(db_index=True)
    customer_id = models.CharField(max_length=5, db_index=True)
    ship_via = models.ForeignKey('Shippers', on_delete=models.CASCADE)
