from django.db import models
from django.contrib.auth.models import AbstractUser
                                 


class ParticleNamesModel(models.Model):
    # может добавить ссылку на вики на каждом языке
    baseid = models.CharField(max_length=50, unique=True)
    name_en = models.CharField(max_length=100)
    name_ru = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100)
    
    def save(self):
        if not self.name_en:
            self.name_en = self.baseid
        if not self.name_ru:
            self.name_ru = self.baseid
        if not self.name_pt:
            self.name_pt = self.baseid
        print("возможно, один из параметров не задан, задаем дефолтное значение")
        super().save()

    class Meta:
        verbose_name = 'Name'
        verbose_name_plural = 'Names'
        # ordering = ['-is_enabled']
        db_table = "particle_names"
        # db_table_comment = "Question answers"

    def __str__(self):
        return self.name_en



class DescriptionsInternacionalsModel(models.Model):
    # может добавить ссылку на вики на каждом языке
    #сделать лэйбл уникальным
    label_for = models.TextField(max_length=100, default="None")
    wiki_url_en = models.URLField(max_length=256, default="None")
    wiki_url_ru = models.URLField(max_length=256, default="None")
    wiki_url_pt = models.URLField(max_length=256, default="None")
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
