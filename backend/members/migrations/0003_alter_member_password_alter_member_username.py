# Generated by Django 5.0.1 on 2024-01-30 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0002_member_hassubscription_member_joined_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='password',
            field=models.CharField(default=-1, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='member',
            name='username',
            field=models.CharField(default=12345, max_length=255),
            preserve_default=False,
        ),
    ]
