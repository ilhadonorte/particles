from rest_framework import serializers

from .models import *

class ParticleCardSerializer(serializers.Serializer):

    number = serializers.IntegerField()  
    baseid = serializers.CharField(max_length=100)
    pdgid = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    name_ru = serializers.CharField(max_length=100)
    name_pt = serializers.CharField(max_length=100)
    is_boson = serializers.BooleanField()
    is_baryon =serializers.BooleanField()
    is_lepton =serializers.BooleanField()
    is_meson = serializers.BooleanField()
    is_quark = serializers.BooleanField()
    decays_counter = serializers.IntegerField()


class ParticleNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticleNamesModel
        fields = '__all__'


class DescriptionInternacionalSerializer(serializers.ModelSerializer):

    class Meta:
        model = DescriptionsInternacionalsModel
        fields = '__all__'