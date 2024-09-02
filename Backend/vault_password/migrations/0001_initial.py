# Generated by Django 5.0.6 on 2024-08-17 21:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordStorage',
            fields=[
                ('storage_id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(blank=True, max_length=2083, null=True)),
                ('website_name', models.CharField(max_length=30)),
                ('category', models.CharField(max_length=30)),
                ('username', models.CharField(max_length=50)),
                ('stored_password', models.CharField(max_length=50)),
                ('note', models.TextField(blank=True, null=True)),
                ('account', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'password_storage',
            },
        ),
    ]