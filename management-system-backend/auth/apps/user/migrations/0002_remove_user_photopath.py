# Generated by Django 5.0.2 on 2024-04-27 21:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='photoPath',
        ),
    ]