from datetime import datetime
import time 
import pdg
import pdg.data
import pdg.particle
import pdg.decay

api = pdg.connect('sqlite:///pdgall-2024-v0.1.2.sqlite')

# tmp = pdg.decay.PdgBranchingFraction(api=api, pdgid="S008.5", edition=None)
tmp = pdg.data.PdgData(api=api, pdgid="S008", edition=None)
print("tmp =", tmp.get_children(), type(tmp))
# for i in tmp.get_children():
#     # print("S008 может распадаться так:", i, type(i), type(i.__class__))
#     if hasattr(i, "decay_products"):
#         print("есть такие продукты:", i, "\n", i.decay_products) 

# print("tmp =", api.get("S008.3"), type(api.get("S008.3")))

# tmp2 = pdg.particle.PdgParticle(api=api, pdgid="S008", edition=None, set_mcid=None, set_name=None)
# print("tmp2 =", tmp2, type(tmp2))
start = datetime.now()
start_time = time.time()
all_decays = []
all_objects = 0
all_particles = api.get_particles()

for item in api.get_all():
    if hasattr(item, "subdecay_level"):
        all_decays.append(item)
#         if "S008" in item.baseid:
#           print("есть такие продукты:", item.baseid, item.subdecay_level, item.get_parent_pdgid()) 
        # print(item.baseid)

# print("Всего объектов было: ", len(list(api.get_all())), "из них распадов:", len(all_decays), "из них частиц:", len(list(all_particles)))

for particle in all_particles:
  print(particle.baseid)
  for decay in all_decays:
    if particle.baseid in decay.baseid:
      print( "for", particle.baseid, "found decay",decay.baseid)

ended = datetime.now()
end_time = time.time()
print("Запрос данных занял: ", ended - start, "mc", end_time - start_time)    
    

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
