from django.contrib import admin
from .models import Categories


class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')


admin.site.register(Categories, CategoriesAdmin)
