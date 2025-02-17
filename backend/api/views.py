from datetime import datetime
import time, os
from django.core.cache import cache
from django.shortcuts import get_object_or_404, render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response 
from rest_framework import viewsets 
from rest_framework.permissions import AllowAny

import pdg

from .serializers import *
from .models import *

# os.system('clear')

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
            name_en,
            name_ru,
            name_pt,
            is_boson,
            is_baryon,
            is_lepton,
            is_meson,
            is_quark,
            spin,
            decays_counter = 0,
            burns_counter = 0,
            charged_states_counter = 0
            # mass = 0
            ):
        
        self.number = number  
        self.baseid = baseid
        self.pdgid = pdgid
        self.name = name
        self.name_en = name_en
        self.name_ru = name_ru
        self.name_pt = name_pt
        self.is_boson = is_boson
        self.is_baryon = is_baryon
        self.is_lepton = is_lepton
        self.is_meson = is_meson
        self.is_quark = is_quark
        self.spin = spin
        self.decays_counter = decays_counter if decays_counter is not None else 0
        self.burns_counter = burns_counter if burns_counter is not None else 0
        self.charged_states_counter = charged_states_counter
        # self.mass = mass if mass is not None else 0

all_names = ParticleNamesModel.objects.all()



# all_particles = api.get_particles()
# all_objects = api.get_all()

# print("Всего объектов было: ", len(list(all_objects)))
# print("из них частиц:", len(list(all_particles)))

# for item in api.get_all():
    # один раз сразу находим только распады, так как их 7253 из 20087 объектов убрать из гета в начало файла чтобы не выполнялось при каждом обращении а эндпоинту. Надо "образуется при распаде х" сделать, чтобы понятно было откуда они берутся.
    # print(item.baseid) сделать сравнение масс и жизней с другими по выбору, электрн, протон..
    # if hasattr(item, "subdecay_level"):
    #     print(item)
        # all_decays.append(item)
# print("из них распадов:", len(all_decays))



class ParticlesView(APIView):
    @method_decorator(cache_page(8*(1+9991*1))) # менять последний 1 на 0 чтобы отключать

    def get(self,request):
        
        start_time = time.time()
        particle_cards = []
        
        for count, item in enumerate(api.get_particles()):
            decays_counter = 0
            burns_counter = 0
            for decay in item[0].branching_fractions():
                decays_counter += 1            

            # print("Этот шаг занял", time.time()-start_time)    
            # if item[0].has_mass_entry:
                # print(f"  заряженное состояние {item.baseid} has mass {item[0].mass} GEv and spin {item[0].quantum_J}" )
            
            # if item[0].has_lifetime_entry:
                # print("lifetime", item[0].lifetime)
            # else:
                # print("n/d")  

            particle = pdg.data.PdgData(api, item.pdgid)
            
            
            particle_details = pdg.particle.PdgParticle(api, item.pdgid)

            try:
                # names = ParticleNamesModel.objects.get(baseid=item[0].baseid)
                names = all_names.get(baseid=item[0].baseid)
                name_ru = names.name_ru if names.name_ru else item[0].baseid
                name_en = names.name_en if names.name_en else item[0].baseid
                name_pt = names.name_pt if names.name_pt else item[0].baseid
            except ParticleNamesModel.DoesNotExist as error:
                c = 1
                # print("Error: item", item[0].baseid, "not found in ParticleNamesModel database\n", error )
            # print(names, name_ru, name_en, name_pt)

            # try:
            #     name_pt = ParticleNamesModel.objects.get(baseid=item.baseid).name_pt
            # except ParticleNamesModel.DoesNotExist:
            #     name_pt = item.baseid
            
            # try:
            #     name_en = ParticleNamesModel.objects.get(baseid=item.baseid).name_en
            # except ParticleNamesModel.DoesNotExist:
            #     name_en = item.baseid
            

                # if particle.description in decay.description.split(">")[1]:
                    # print("найдено рождение частицы", particle.description, "в распаде: ", decay.baseid, " вот так:", decay.description)
                    # burns_counter += 1
            # print("всего частица рождается в распадах других, раз: ", burns_counter) 
            
            # print("particle ", particle.baseid, "has", decays_counter, "decays")

            particle_card = ParticleCard(
                number = count,
                baseid = item.baseid,
                pdgid = item.pdgid,
                name = particle.description,
                name_en = name_en,
                name_ru = name_ru,
                name_pt = name_pt,
                is_boson = particle_details.is_boson,
                is_baryon = particle_details.is_baryon,
                is_lepton = particle_details.is_lepton,
                is_meson = particle_details.is_meson,
                is_quark = particle_details.is_quark,
                spin = item[0].quantum_J if item[0].quantum_J else "n/d",
                decays_counter = decays_counter,
                burns_counter = burns_counter,
                charged_states_counter = len(item)
                # mass=1
            )
            # print(particle_card.number)
            particle_cards.append(particle_card)
        
        serializer = ParticleCardSerializer(particle_cards, many=True)
        end_time = time.time()
        print("Запрос данных занял: ", end_time - start_time, " c")
        return Response(serializer.data)    
    


class ParticleNamesViewSet(viewsets.ModelViewSet):
    queryset = ParticleNamesModel.objects.all()
    serializer_class = ParticleNameSerializer
    permission_classes = [AllowAny]    



class DescriptionViewSet(viewsets.ModelViewSet):
    queryset = DescriptionsInternacionalsModel.objects.all()
    serializer_class = DescriptionInternacionalSerializer
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
    
    def patch(self, request, *args, **kwargs):
        print("вошли в patch метод, редактировать будем имя:", kwargs['baseid'])
        print("данные из запроса для апдейта: \n",request.data)
        particle = ParticleNamesModel.objects.get(baseid = kwargs["baseid"])
        for key in request.data :
            if key in particle.__dict__:
                # print("found keys:", request.data[key], particle.__dict__[key])
                if request.data[key] != particle.__dict__[key]:
                    print("field", key, "was changed:", particle.__dict__[key], "=>", request.data[key])
                    particle.__dict__[key] = request.data[key]
                    
            else:
                error_text = "прилетел непонятный key:" + key + " со значением: " + request.data[key]
                print(error_text)
                return Response(error_text, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            
        particle.save()
        serializer = ParticleNameSerializer(particle)
        print("название частицы было успешно отредактировано:\n",serializer.data )
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    


class ParticleDetailView(APIView):

    def get(self, request, *args, **kwargs):
        print("вошли в get метод ParticleDetailView, имя ", kwargs['baseid'])
        charged_states = api.get(kwargs['baseid'])

        charged_states_names = [charged_state.name for charged_state in charged_states]
        all_decays_splitted = cache.get("all_decays_splitted")
        
        for charged_state_name in charged_states_names: 
            burns = []
            for decay in all_decays_splitted:
                if charged_state_name in decay:
                    burns.append(
                    decay.description
                )
            particle_details = {
            charged_state_name : burns
            }
        print(particle_details)

    pass    