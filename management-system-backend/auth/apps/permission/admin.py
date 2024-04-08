from django.contrib import admin
from apps.permission.models import Permission

# Register your models here.


class PermissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'id_profile', 'id_privilege')


admin.site.register(Permission, PermissionAdmin)
