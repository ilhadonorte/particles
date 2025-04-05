from rest_framework import serializers

from .models import *

from django.conf import settings  

class ParticleCardSerializer(serializers.Serializer):

    number = serializers.IntegerField()  
    baseid = serializers.CharField(max_length=100)
    pdgid = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    name_en = serializers.CharField(max_length=100)
    name_ru = serializers.CharField(max_length=100)
    name_pt = serializers.CharField(max_length=100)
    is_boson = serializers.BooleanField()
    is_baryon =serializers.BooleanField()
    is_lepton =serializers.BooleanField()
    is_meson = serializers.BooleanField()
    is_quark = serializers.BooleanField()
    spin = serializers.CharField(max_length=100)
    decays_counter = serializers.IntegerField()
    burns_counter = serializers.IntegerField()
    charged_states_counter = serializers.IntegerField()
    # mass = serializers.FloatField()
    particle_type = serializers.CharField(max_length=100)


class ParticleNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticleNamesModel
        fields = '__all__'


class DescriptionInternacionalSerializer(serializers.ModelSerializer):

    class Meta:
        model = DescriptionsInternacionalsModel
        fields = '__all__'