from datetime import datetime
from django.shortcuts import get_object_or_404, render

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response 
from rest_framework import viewsets 
from rest_framework.permissions import AllowAny

import pdg

from .serializers import *
from .models import *

api = pdg.connect('sqlite:///pdgall-2024-v0.1.2.sqlite')
# файл пгдаты похоже надо класть в корень проекта, из папки приложения непонятно как подключать
# wget https://pdg.lbl.gov/2024/api/pdgall-2024-v0.1.2.sqlite

class ParticleCard():

    def __init__(
            self, 
            number, 
            baseid,
            pdgid, 
            name,
            name_ru,
            name_pt,
            is_boson,
            is_baryon,
            is_lepton,
            is_meson,
            is_quark
            ):
        
        self.number = number  
        self.baseid = baseid
        self.pdgid = pdgid
        self.name = name
        self.name_ru = name_ru
        self.name_pt = name_pt
        self.is_boson = is_boson
        self.is_baryon = is_baryon
        self.is_lepton = is_lepton
        self.is_meson = is_meson
        self.is_quark = is_quark




class ParticlesView(APIView):


    def get(self,request):
        
        start = datetime.now()
        particle_cards = []
        for count, item in enumerate(api.get_particles()):
            # print(count, item.baseid, item.__dict__)
            particle = pdg.data.PdgData(api, item.pdgid)
            particle_details = pdg.particle.PdgParticle(api, item.pdgid)

            try:
                name_ru = ParticleNamesModel.objects.get(baseid=item.baseid).name_ru
            except ParticleNamesModel.DoesNotExist:
                name_ru = "particle russian name not found in database"
            
            try:
                name_pt = ParticleNamesModel.objects.get(baseid=item.baseid).name_pt
            except ParticleNamesModel.DoesNotExist:
                name_pt = "particle portugues name not found in database"
            
            particle_card = ParticleCard(
                number = count,
                baseid = item.baseid,
                pdgid = item.pdgid,
                name = particle.description,
                name_ru = name_ru,
                name_pt = name_pt,
                is_boson = particle_details.is_boson,
                is_baryon = particle_details.is_baryon,
                is_lepton = particle_details.is_lepton,
                is_meson = particle_details.is_meson,
                is_quark = particle_details.is_quark
            )
            # print(particle_card.number)
            particle_cards.append(particle_card)
        ended = datetime.now()
        serializer = ParticleCardSerializer(particle_cards, many=True)
        print("Запрос данных занял: ", (ended - start)/1000, "mc")
        return Response(serializer.data)    
    


class ParticleNamesViewSet(viewsets.ModelViewSet):
    queryset = ParticleNamesModel.objects.all()
    serializer_class = ParticleNameSerializer
    permission_classes = [AllowAny]    



class ParticleNameView(APIView):
        
    def get(self, request, *args, **kwargs):
        print("вошли в get метод, редактировать будем имя ", kwargs['baseid'])
        particle, created = ParticleNamesModel.objects.get_or_create(
        baseid=kwargs['baseid'],
        defaults={"baseid": kwargs['baseid']}
        )
        print("название частицы было создано:", created )
        # particle = ParticleNamesModel.objects.get(baseid=kwargs['baseid'])
        serializer = ParticleNameSerializer(particle)
        # сделать возвращение 201 кода если создано и 
        return Response(serializer.data)