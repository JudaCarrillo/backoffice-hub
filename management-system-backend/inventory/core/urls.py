"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import os

VERSION = os.environ.get('APP_VERSION')

schema_view = get_schema_view(
    openapi.Info(
        title="Management System API's",
        default_version=VERSION,
        description='This is an API for gets positions',
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="judacarrillo.dev@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Swagger
    path('documentation/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),

    path('admin/', admin.site.urls),
    path(f'{VERSION}/categories/', include('apps.category.urls')),
    path(f'{VERSION}/suppliers/', include('apps.supplier.urls')),
    path(f'{VERSION}/customers/', include('apps.customer.urls')),
    path(f'{VERSION}/products/', include('apps.product.urls')),
]
