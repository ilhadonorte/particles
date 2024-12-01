from django.db import models
from django.contrib.auth.models import AbstractUser
                                 


class ParticleNamesModel(models.Model):
    baseid = models.CharField(max_length=50, unique=True)
    name_ru = models.CharField(max_length=100, default="Dont have name in your language yet")
    name_pt = models.CharField(max_length=100, default="Dont have name in your language yet")
