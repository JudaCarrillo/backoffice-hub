# Generated by Django 5.0.2 on 2024-04-12 08:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
        ('vendor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('price', models.FloatField()),
                ('stock', models.IntegerField()),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.category')),
                ('id_vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendor.vendor')),
            ],
        ),
    ]
