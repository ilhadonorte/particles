from datetime import datetime
import os
import pdg
import pdg.data
import pdg.particle
import pdg.decay
os.system('clear')
api = pdg.connect('sqlite:///pdgall-2024-v0.1.2.sqlite')

#  B033 charded states: 8 decays: 5 burns: 78 
# ps = api.get('B033')
#  M036 charded states: 3 decays: 6 burns: 41
# ps = api.get('M036')
#  S003 charded states: 2
ps = api.get('')

print("Частица", ps, "имееет", len(ps), "заряженных состояний")
for p in ps: #<class 'pdg.particle.PdgParticle'>
    # print(type(p), p.__dict__)
    print("\nname ",p.name, p.description, p.mass, "GEv, spin", p.quantum_J, "mcid", p.mcid, ", charge:", p.charge)
    if p.has_lifetime_entry:
       print(p.lifetime)
    else:
       print("n/d")   
    for bf in p.branching_fractions():
      print("   ", bf ) # <class 'pdg.decay.PdgBranchingFraction'>


# all_particles = api.get_particles()
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
# print("Запрос данных занял: ", ended - start, "mc", end_time - start_time)    
    

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
