from django.contrib import admin
from apps.user.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name',
                    'email', 'is_active', 'created_at')


admin.site.register(User)
