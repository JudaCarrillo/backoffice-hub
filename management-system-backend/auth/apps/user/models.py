from django.db import models
from apps.user_profile.models import UserProfile


class User(models.Model):

    id = models.AutoField(primary_key=True)
    last_name = models.CharField(max_length=20, db_index=True)
    first_name = models.CharField(max_length=10)
    title = models.CharField(max_length=30, null=True)
    title_of_courtesy = models.CharField(max_length=25, null=True)
    birth_date = models.DateField(null=True)
    hire_date = models.DateField(null=True)
    address = models.CharField(max_length=60, null=True)
    city = models.CharField(max_length=15, null=True)
    region = models.CharField(max_length=15, null=True)
    postal_code = models.CharField(max_length=10, null=True, db_index=True)
    country = models.CharField(max_length=15, null=True)
    home_phone = models.CharField(max_length=24, null=True)
    extension = models.CharField(max_length=4, null=True)
    photo = models.ImageField(null=True, upload_to='files/users/')
    notes = models.TextField()
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=255, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    reports_to = models.ForeignKey(
        'self', on_delete=models.RESTRICT, null=True, blank=True, default=None, db_index=True, related_name='subordinates'
    )
    id_profile = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self) -> str:
        label = f'{self.first_name} {self.last_name}'
        return label

    def save(self, *args, **kwargs):
        if self.reports_to == self:
            self.reports_to = None
        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=~models.Q(reports_to=models.F('id')),
                name='reports_to_not_self'
            )
        ]
