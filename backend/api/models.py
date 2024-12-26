from django.db import models
from django.contrib.auth.models import AbstractUser
                                 


class ParticleNamesModel(models.Model):
    # может добавить ссылку на вики на каждом языке
    baseid = models.CharField(max_length=50, unique=True)
    name_en = models.CharField(max_length=100, default="Dont have english name yet")
    name_ru = models.CharField(max_length=100, default="Не задано пока название на русском")
    name_pt = models.CharField(max_length=100, default="Ainda sem nome em português")
    
    class Meta:
        verbose_name = 'Name'
        verbose_name_plural = 'Namess'
        # ordering = ['-is_enabled']
        db_table = "particle_names"
        # db_table_comment = "Question answers"

    def __str__(self):
        return self.name_en



class DescriptionsInternacionalsModel(models.Model):
    # может добавить ссылку на вики на каждом языке
    description_en = models.TextField(default="Description in English is not set yet")
    description_ru = models.TextField(default="Описание на русском пока не задано")
    description_pt = models.TextField(default="Ainda não há descrição em português")

    class Meta:
        verbose_name = 'Description'
        verbose_name_plural = 'Descriptionss'
        # ordering = ['-is_enabled']
        db_table = "descriptions"
        # db_table_comment = "Question answers"

    def __str__(self):
        return self.description_ru
