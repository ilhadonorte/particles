import pdg
import pdg.data
import pdg.particle

api = pdg.connect('sqlite:///pdgall-2024-v0.1.2.sqlite')

# for item in api.get_all():
for count, item in enumerate(api.get_particles()):
  # print("\nitem: №", count, item.baseid, item.pdgid)
  # pp = pdg.data.PdgData(api, item.pdgid)
  pp2 = pdg.particle.PdgParticle(api, item.pdgid)
  # print("pp2=", pp2.__dict__)
  if not pp2.name:
    pp2.name = "NONE"
  print(
        count, 
        pp2.name,
        pp2.is_boson
        # pp2.lifetime, 
        # pp.description,
        # pp2.lifetime 
        # pp.__dict__
        )
  # particle = api.get(item.pdgid)
  # print("particle_details: ", count, particle.__dict__)
  # print('%-20s  %s  %s  %s' % (
  #   item.pdgid, 
  #   item.__dict__,
  #   item.baseid, 
  #   item.description))
