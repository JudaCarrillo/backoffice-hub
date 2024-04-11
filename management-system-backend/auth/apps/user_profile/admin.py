from django.contrib import admin
from apps.user_profile.models import UserProfile

# Register your models here.


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_active', 'created_at')


admin.site.register(UserProfile, UserProfileAdmin)
