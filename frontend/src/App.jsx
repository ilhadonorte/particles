import { useState, useEffect } from 'react'
import standartModel from '/standart_model.png'
import './App.css'
import ParticleCard from './components/PacticleCard';
import ParticlesGroup from './components/ParticlesGroup';
import { API_PARTICLES_URL, API_NAMES_URL } from "./constants"; 

function App() {
  const [count, setCount] = useState(0)
  const [particles, setParticles] = useState([])
  const [leptons, setLeptons] = useState([])

  useEffect(() => {
    fetchParticles();
  }, []);  

  const fetchParticles = async () => {
    try {
      const response = await fetch(API_PARTICLES_URL);
      const particles = await response.json();
      // console.log(particles)
      setParticles(particles);
      // const bosons = particles.filter((particle) => particle.is_boson )
      // const baryons = particles.filter((particle) => particle.is_baryon )
      let leptons = particles.filter((particle) => particle.is_lepton)
      setLeptons(leptons)
      // const mesons = particles.filter((particle) => particle.is_meson )
      // const quarks = particles.filter((particle) => particle.is_quark )
      // console.log(bosons)
      // console.log(baryons)
      console.log(leptons)
      // console.log(mesons)
      // console.log(quarks)
    } catch (err) {
      console.log(err);
    }
  };  



  return (
    <>
      <div>
      <h1>Стандартная модель элементарных частиц </h1>
      Добавить селекторы для языка
      <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group</a> | 
      <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> | 
      <hr></hr>

        <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={standartModel} className="logo" alt="Vite logo" />
        </a>
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <ParticlesGroup particlesGroup={leptons}></ParticlesGroup> <br></br>

      {particles.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
      
    </>
  )
}

export default App
