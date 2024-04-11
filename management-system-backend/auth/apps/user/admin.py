from django.contrib import admin
from apps.user.models import User

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_active', 'created_at')


admin.site.register(User)
