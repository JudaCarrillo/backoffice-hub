from django.db import models


class Suppliers(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=40, db_index=True)
    contact_name = models.CharField(max_length=30)
    contact_title = models.CharField(max_length=30)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=15)
    region = models.CharField(max_length=15)
    postal_code = models.CharField(max_length=10, db_index=True)
    country = models.CharField(max_length=15)
    phone = models.CharField(max_length=24)
    fax = models.CharField(max_length=24)
    home_page = models.URLField()

    def __str__(self):
        return self.company_name
