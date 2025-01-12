import { useState, useEffect } from 'react'
import { API_PARTICLES_URL } from "../constants"; 
import { useParams } from "react-router";

function ParticleDetailComparator() {
  const [particles, setParticles] = useState([])

  const fetchParticles = async () => {
    console.time('fetchParticles');
  
    try {
      const response = await fetch(API_PARTICLES_URL);
      const particles = await response.json();
      setParticles(particles)
    } catch (err) {
      console.log(err);
    }
    console.timeEnd('fetchParticles');
  };  
  
    
  useEffect(() => {
    fetchParticles();
    // минин эту функцию расписал внутри самого хука почему
  }, []);  
  

  const handleSelectedParticle = (e) => {
    console.log("Выбрана частица:", e.target.value)
  }

  const handleSelectParticleForComparar = (e) => {
    console.log("Сравнивать будем с частицей:", e.target.value)
  }

  let params = useParams()
  console.log(params.baseid)

  console.log("found language for particle details page:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  return (
    <div>
      <h1>Particle details e particle comparator page</h1>
      <label>
        Выберите частицу:
        <select name="selectedParticle" onChange={handleSelectedParticle}>
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.baseid} / {particle.name_ru}</option>)}
          {/* добавить пустую опцию */}
        </select>
      </label>
        
      сравнивать с частицей:
        
        <select name="compararComParticle" onChange={handleSelectParticleForComparar}>
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.baseid} / {particle.name_ru}</option>)}
        </select>
        <br></br>
        сравнивать с массой:
        <select name="compararComParticle">
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.name_ru}</option>)}
        </select>
      <hr></hr>

      Частица распадается следующими способами: если распадов нет то возможно они пока не зафиксированы или нет данных

      Частица рождается при распадах:
      
      Если нет то частица рождается при столкновениях и прочих внешних воздействиях
    </div>

  )
}

export default ParticleDetailComparator
