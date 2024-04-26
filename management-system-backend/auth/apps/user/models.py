from django.db import models
from apps.user_profile.models import UserProfile

# Create your models here.


class User(models.Model):

    id = models.AutoField(primary_key=True)
    lastName = models.CharField(max_length=20, null=False, db_index=True)
    firstName = models.CharField(max_length=10, null=False)
    title = models.CharField(max_length=30, null=True)
    titleOfCourtesy = models.CharField(max_length=25, null=True)
    birthDate = models.DateField(null=True)
    hireDate = models.DateField(null=True)
    address = models.CharField(max_length=60, null=True)
    city = models.CharField(max_length=15, null=True)
    region = models.CharField(max_length=15, null=True)
    postalCode = models.CharField(max_length=10, null=True, db_index=True)
    country = models.CharField(max_length=15, null=True)
    homePhone = models.CharField(max_length=24, null=True)
    extension = models.CharField(max_length=4, null=True)
    notes = models.TextField()
    # photo= models.BinaryField()
    photoPath = models.ImageField(null=True, upload_to='users')
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=255, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    reportsTo = models.ForeignKey(
        'self', on_delete=models.RESTRICT, default=None, db_index=True
    )
    id_profile = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self) -> str:
        label = f'{self.firstName} {self.lastName} - {self.email}'
        return label
