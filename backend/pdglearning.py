from datetime import datetime
import json
from django.core.cache import cache
from django.core import serializers
import os
import pprint
import time
import pdg
import pdg.data
import pdg.particle
import pdg.decay
import pickle 
import redis
from redis.commands.json.path import Path
from dotenv import load_dotenv

# Carregando as variáveis de ambiente do arquivo .env
load_dotenv()
os.system('clear')
api = pdg.connect('sqlite:///pdgall-2024-v0.1.2.sqlite')

r = redis.Redis(host=os.getenv("REDIS_SERVER"), port=6379, decode_responses=True)
r.set('foo', 'bar')

class Decay():

   def __init__(self, parent_baseid, description, splitted_description):
      self.parent_baseid = parent_baseid
      self.description = description
      self.splitted_description = splitted_description

start_time = time.time()
print("Начинаем поиск всех распадов в Redis...")

def cache_all_decays():
   if r.hlen('all_decays') > 6500:
      print("Данные распадов уже найдены в Redis, это заняло: ", time.time()- start_time)
   else:
      print("Данные распадов не найдены в Redis, начинаем поиск всех распадов в бд, чтобы закешировать, занимает несколько секунд...")
      all_decays = {}

      for particle in api.get_particles():
         for bf in particle[0].branching_fractions():
            all_decays[bf.description] = particle.baseid
            # тоесть получаем словарь распад(они уникальные), бэйзид для ссылки, нарезанный распад для поиска рождений
      decay_splitting_time = time.time()
      print(f"Всего нашли распадов: {len(all_decays)}, поиск занял { decay_splitting_time - start_time} и должен быть закеширован" )

      print(f"Caching all decays to Redis...")
      for key, value in all_decays.items():
         r.hset('all_decays', key, value)
      print(f"Redis chaching completed занял { time.time()- decay_splitting_time}")


def cache_all_burns():
   start_time = time.time()
   # print(r.scard("all_burns"))
   # print(r.zcard("all_burns"))
   if len(r.hgetall("all_burns")) < 300:
      all_decays = r.hgetall('all_decays')
      for charged_states in api.get_particles():
         for charged_state in charged_states: #<class 'pdg.particle.PdgParticle'>
            burns = {}
            for key, value in all_decays.items():
               if charged_state.name in key.split():
                  burns[key] = value
                  # print(burns[value])
                  r.hset("all_burns" + ":" + charged_state.name, key, value)       
   print("Поиск рождений частиц и добавление в Redis (сделать балком pipelines) заняло: ", time.time()- start_time)
            # print("Рождение заряженного состояния ", charged_state.name, "было найдено", len(burns), "способами:")
   # decays = []
   # for bf in charged_state.branching_fractions():
   #    decays.append(bf.description)

   # print(f'\nНачинаем искать рождения заряженного состояния {charged_state.name} in Redis ')
   
   # is_burns_exists = r.hexists("all_burns" + ":" + charged_state.name, key)
   # burns = r.hgetall("all_burns" + ":" + charged_state.name)
   # if burns:
   #    print(f"Рождения уже были найдены ранее")
   # else:   
   #    print(f"Рождения небыли найдены ранее, придется вычислять")
   
   
   # pprint.pprint(burns)

def cache_particle_cards():
   for charged_states in api.get_particles():
      decays_counter = r.hgetall("all_decays").items()
      # print(decays_counter)
      # if charged_states.has_mass_entry:
      #   mass = charged_states.mass
      # else: mass = "n/d"   
      r.json().set("particle_cards" + ":" + charged_states.description, "$", 
         {"charged_states":len(charged_states)} )
   #    pass

cache_all_decays()

cache_all_burns()

cache_particle_cards()
#  B033 charded states: 8 decays: 5 burns: 78 
# ps = api.get('B033')
#  M036 charded states: 3 decays: 6 burns: 41
# ps = api.get('M036')
#  S003 electron charded states: 2


pdgid = 'M036'
charged_states = api.get(pdgid)
particle_details = {}
# r.json().set("mykey", ".", {"hello": "world", "i am": ["a", "json", "object!"]})
print("Частица", charged_states.description, "имееет", len(charged_states), "заряженных состояний:")
for charged_state in charged_states: #<class 'pdg.particle.PdgParticle'>
   burns = r.hgetall("all_burns" + ":" + charged_state.name)
   r.json().set("charged_states" + ":" + charged_states.description + ":" + charged_state.name, "$", {charged_state.name:charged_state.charge, "burns_counter":len(burns)} )
   print(f"    {charged_state.name}, mass: {charged_state.mass} GEv, spin {charged_state.quantum_J}, mcid {charged_state.mcid}, charge: {charged_state.charge} ")
   pprint.pprint(burns)
   # if charged_state.has_lifetime_entry:
   #     print(f"lifetime: {charged_state.lifetime}")
   # else:
   #    print("n/d")


   # print("decays:", len(decays))
   
   # particle_details[charged_state.name] = burns
   
# pprint.pprint(particle_details)
# print(repr(particle_details))

   # burn = {
   #     'pdgid': particle.pdgid,
   #     'name': particle.description,
   #     'burns': burns
   #   }
      # all_burns.append(burn)

   # burn_num = 4
# algo = pdg.data.PdgData(api, pdgid, edition=None)
# print(f"algo: {algo}   type: {type(algo)}   algo.description: {algo.description}  algo.get_particle(): {algo.get_particle} algo.get_particles(): {algo.get_particles}")

# print(all_burns.index(pdgid))
# tp = 0
# ap = 0
# for count, particle in enumerate(all_particles):
#     print(f"исследуем частицу {count} {particle.baseid} в базе есть заряженных состояний: {len(particle)}")
#     # items = api.get(particle.pdgid)
#     ap += 1
#     for item in particle:
      #  print(item.branching_fractions())
      #  if item.has_mass_entry:
      #   print(f"  заряженное состояние {item.baseid} has mass {item.mass} Gev and spin {item.quantum_J}" )
      #  tp += 1
    # if hasattr(particle, 'mass'):
# print(f"Частиц найдено {ap} заряженых состояний {tp}" )
# particle = pdg.data.PdgMass(api, "S008/2024")
# particle = pdg.data.PdgLifetime(api, "S008/2024")
# print(pdg.data.PdgLifetime(api, "S003/2024"))
# tmp = pdg.decay.PdgBranchingFraction(api=api, pdgid="S008.5", edition=None)
# tmp = pdg.data.PdgData(api=api, pdgid="S008", edition=None)
# tmp = pdg.data.PdgMass(api=api, pdgid="S008", edition=None)
# print("tmp =", tmp.get_particle(), type(tmp))
# for i in tmp.get_children():
#     # print("S008 может распадаться так:", i, type(i), type(i.__class__))
#     if hasattr(i, "decay_products"):
#         print("есть такие продукты:", i, "\n", i.decay_products) 

# print("tmp =", api.get("S008.3"), type(api.get("S008.3")))

# tmp2 = pdg.particle.PdgParticle(api=api, pdgid="S008", edition=None, set_mcid=None, set_name=None)
# print("tmp2 =", tmp2, type(tmp2))
# start = datetime.now()
# start_time = time.time()
# all_decays = []
# all_objects = 0
# 

# for item in api.get_all():
#     if hasattr(item, "subdecay_level"):
#         all_decays.append(item)
#         if "S008" in item.baseid:
#           print("есть такие продукты:", item.baseid, item.subdecay_level, item.get_parent_pdgid()) 
        # print(item.baseid)

# print("Всего объектов было: ", len(list(api.get_all())), "из них распадов:", len(all_decays), "из них частиц:", len(list(all_particles)))

# for particle in all_particles:
#   print("для частицы", particle.baseid, particle.description, " начинаем искать распады и рождения: ")
#   print(particle.__dict__)
  # particle.burns = 0
  # for decay in all_decays:
  #   if particle.baseid in decay.baseid:
  #     print( "for", particle.baseid, "с названием", particle.description, "found decay",decay.baseid, decay.description.split(">")[1])
  #     if hasattr(particle, 'quantum_J'):
  #        print(particle.quantum_J)
  #   if particle.description in decay.description.split(">")[1]:
  #      print("найдено рождение частицы", particle.description, "в распаде: ", decay.baseid, " вот так:", decay.description)
  #      particle.burns += 1
  # print("всего частица рождается в распадах других, раз: ", particle.burns)   

# ended = datetime.now()
# end_time = time.time()
    

# for count, item in enumerate(api.get_particles()):
  # print("\nitem: №", count, item.baseid, item.pdgid)
  # pp = pdg.data.PdgData(api, item.pdgid)
  # pp2 = pdg.particle.PdgParticle(api, item.pdgid)
  # 
  # if not pp2.name:
  #   pp2.name = "NONE"
  # print(
  #       count, 
  #       pp2.name,
  #       pp2.is_boson
  #       # pp2.lifetime, 
  #       # pp.description,
  #       # pp2.lifetime 
  #       # pp.__dict__
  #       )
  # # particle = api.get(item.pdgid)
  # print("particle_details: ", count, particle.__dict__)
  # print('%-20s  %s  %s  %s' % (
  #   item.pdgid, 
  #   item.__dict__,
  #   item.baseid, 
  #   item.description))

print(f"\nЗапрос данных занял: {time.time() - start_time} sec")    