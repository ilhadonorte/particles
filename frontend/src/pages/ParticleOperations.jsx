import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react'
import { ParticlesContext } from '../ParticlesContext'
import { useLocation } from 'react-router-dom';  
import ParticleCard from '../components/ParticleCard/PacticleCard.tsx';
import { API_NAME_URL  } from "../constants"; 



function ParticleOperations() {
  
  // const location = useLocation();  
  // const particles = location.state?.particles;  
  const particles = useContext(ParticlesContext)

  // console.log("particles in all particles page: ", {particles})

  const [filteredParticles, setFilteredParticles] = useState([...particles])

  const chardedStatesCounter = filteredParticles.reduce((accumulator, p) => accumulator + p.charged_states_counter, 0);  


  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    // gridTemplateRows: "repeat(3, 100px)"
  }

  console.log("found language for particle operations page:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  
  
  const handleFilter = (e) =>{
    // console.log("Selected filter option:", e.target.value)
    let fp = particles.filter(particle => {
            switch(e.target.value)
            {
              case "show_all": return true;
              case "bosons": return particle.is_boson;
              case "barions": return particle.is_baryon;
              case "leptons": return particle.is_lepton;
              case "mesons": return particle.is_meson;
              case "quarks": return particle.is_quark;
              case "unknown": return particle.particle_type == 'unknown';
              // помнить что есть частицы не попадающие под эту классификацию, что это за частицы придется разираться
            }
                
          })
    // console.log(particles)
    console.log("отфильтрованный массив: ", fp)
    setFilteredParticles(fp)
    

  }
  
const handleSorting = (e) => {
  console.log("Selected sorting option:", e.target.value)
  let sp = filteredParticles.sort((a, b) =>
  {
    switch(e.target.value){
      case "decays": return a.decays_counter > b.decays_counter ? -1 : 1;
      case "burns": return a.burns_counter > b.burns_counter ? -1 : 1;
      case "charged_states_counter": return a.charged_states_counter > b.charged_states_counter ? -1 : 1;
    }
  }

  )
  console.log("отсортированный массив: ", sp)
  console.log("сейчас хук должен перерисовать компонент")
  setFilteredParticles(sp)
} 
  
  return (
    <div>

      <label>
        отфильтровать 
        &nbsp;
        <select name="compararComParticle" onChange={handleFilter}>
          <option value={'show_all'}>show all particles</option>
          <option value={'bosons'}>бозоны</option>
          <option value={'mesons'}>мезоны</option>
          <option value={'barions'}>барионы</option>
          <option value={'quarks'}>кварки</option>
          <option value={'leptons'}>лептоны</option>
          <option value={'unknown'}>пока не понятные</option>
          {/* {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.name_ru}</option>)} */}
        </select>
        &nbsp;
        всего найдено: <b>{filteredParticles.length}</b>
        &nbsp;
        заряженных состояний: <b>{chardedStatesCounter}</b> {' '}
      </label>


        <label>сортировать по:</label>
        &nbsp;
        <select name="sortingParticle" onChange={handleSorting}>
          <option value={''}>------</option>
          <option value={'masses'}>массе</option>
          <option value={'decays'}>распадам</option>
          <option value={'burns'}>рождениям</option>
          <option value={'charged_states_counter'}>заряженным состояниям</option>
        </select>
        &nbsp;

      <div style={styles}>
      {[...filteredParticles].map(particle => <ParticleCard 
        key={particle.number} 
        particle={particle}
        // {/* доделать открытив в новой вкладке */}
        // {/* onClick={window.open("/particle-details/"+ particle.baseid, '_blank') } */}
        >
        
         
        </ParticleCard>)}
      </div>  
      
    </div>


  )
}

export default ParticleOperations
