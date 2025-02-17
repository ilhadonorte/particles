import { useState, useEffect } from 'react'
import { API_PARTICLES_URL, API_PDG_REST_URL  } from "../constants"; 
import { useParams } from "react-router";

import diquarks_and_spin from "/images/diquarks_differetn_spin_expl_charge.png"

function ParticleDetailComparator() {
  const [particles, setParticles] = useState([])

  let params = useParams()
  console.log(params.baseid)
  let urlForAllDetails = API_PDG_REST_URL + params.baseid 

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


  console.log("found language for particle details page:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  return (
    <div>
      <h3>Particle details e particle comparator page</h3>
      <a href=''>Random particle</a><br></br>
      <label>
        Выберите частицу:
        <select name="selectedParticle" onChange={handleSelectedParticle}>
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.baseid} / {particle.name_ru}</option>)}
          {/* добавить пустую опцию */}
        </select>
      </label>
        
      сравнить с:
        
        <select name="compararComParticle" onChange={handleSelectParticleForComparar}>
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.baseid} / {particle.name_ru}</option>)}
        </select>
        <br></br>

        сравнивать с массой:
        <select name="compararComParticle">
          {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.name_ru}</option>)}
        </select>
      <hr></hr>

      <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={diquarks_and_spin} 
          width={700}
          // className="logo" 
          alt="diquak and diferent spin" />
        </a><br></br>
      {!params.baseid ? 'Частица не выбрана, выберите частицу из списка' : 'выбрана частица' + <b> + params.baseid + </b>} <br></br>

    <p>
    Частица <b>{params.baseid}</b> имеет следующие заряженные состояния: <br></br>

    распадается следующими способами: <br></br>
    если распадов нет то возможно они пока не зафиксированы или нет данных <br></br>

    Частица рождается при распадах:<br></br>
    
    <a href={'https://pdglive.lbl.gov/Particle.action?init=0&node=' + params.baseid} target='_blank'> more on pdg live</a>
    | <a href={urlForAllDetails} target='blank'> json on pdg </a><br></br>

  Сюда добавить что найдено в чат джипити про частицу

    Если рождений тут нет, то частица возможно рождается при:<br></br>
    - распаде не субатомных частиц а при распаде нестабильных изотопов атомных ядер, как например рождается позитрон при распаде углерод-11;<br></br>
    - столкновениях на ускорителях и взрывах звезд;<br></br>
    - прочих внешних воздействиях, как например позитроны, возникающие в процессах рождения электрон-позитронных пар в сильном электрическом поле.     <br></br> 
    </p>
    </div>

  )
}

export default ParticleDetailComparator
