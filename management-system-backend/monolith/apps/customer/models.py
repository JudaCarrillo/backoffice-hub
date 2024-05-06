from django.db import models


class Customers(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    company_name = models.CharField(max_length=40, db_index=True)
    contact_name = models.CharField(max_length=30)
    contact_title = models.CharField(max_length=30)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=15, db_index=True)
    region = models.CharField(max_length=15, db_index=True)
    postal_code = models.CharField(max_length=10, db_index=True)
    country = models.CharField(max_length=15)
    phone = models.CharField(max_length=24)
    fax = models.CharField(max_length=24)

    def __str__(self):
        return self.company_name
