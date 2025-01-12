import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

import ParticleCard from '../components/ParticleCard/PacticleCard';

import { API_PARTICLES_URL } from "../constants"; 

import ReactModal from 'react-modal';
import ModalForDescription from '../components/ModalForDescription/ModalForDescription';

function ParticleOperations() {

  const [particles, setParticles] = useState([])

  const [filteredParticles, setFilteredParticles] = useState([])

  const [filteringOption, setFilteringOption] = useState(['show_all'])

  const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);

  const [modalForDescriptionIsOpen, setModalForDescriptionIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    baseid:"",
    name_en:"",
    name_ru:"",
    name_pt:""
  })

  const closeModal = () => {
    // setModalIsOpen(false);
    setModalForEditNameIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }; 

  const editParticleName = async function (e)
{
  e.preventDefault();
  await axios.post(API_NAME_URL, formData)
    .then(function (response) 
      {
        console.log("Success!", response.data)
        console.log(response);
        toast.success(`Successfully created! ${response.data}` ,
          {
            duration: 7000,
            position: 'top-right'
          }
        );
        setModalForEditNameIsOpen(false)
      })
    .catch(function (error) 
      {
        console.log(error, API_NAME_URL, formData);
        console.log("Error during data posting!", error.response?.data);
        toast.error('This is an error!',
          {
           duration: 7000,
           position: 'top-right'
         });
        
      })
    .finally(function () 
      {
        // toast('Here is your toast.')
        // выполняется всегда
      });
  
  }

  const modalContentForName = (
    <div>
      <h2>Add new particle name</h2>

      <p>
      <input
          type="text"
          name="baseid"
          value={formData.baseid}
          placeholder="Particle baseid..."
          onChange={handleChange}
        /> 
        <br></br>

        <input
          type="text"
          name="name_ru"
          value={formData.name_ru}
          placeholder="Russian name..."
          onChange={handleChange}
        />
        <br></br>

        <input
          type="text"
          name="name_pt"
          value={formData.name_pt}
          placeholder="Português name..."
          onChange={handleChange}
        />
        | <a href='https://pt.wikipedia.org/wiki/Part%C3%ADcula_elementar#:~:text=Em%20f%C3%ADsica%20de%20part%C3%ADculas%2C%20uma,como%20el%C3%A9trons%2C%20pr%C3%B3tons%20e%20n%C3%AAutrons.' target='blank'>see here</a>
        <br></br>
        
        <button 
          onClick={() => setModalForEditNameIsOpen(false)}
          >Cancel 
        </button>

        <button 
          onClick = {editParticleName}
        >Save name </button>

      </p>
    </div>
  );


  const fetchParticles = async () => {
    console.time('fetchParticles');
  
    try {
      const response = await fetch(API_PARTICLES_URL);
      const particles = await response.json();
      // console.log(particles)
      setParticles(particles);
      setFilteredParticles(particles);
      // const bosons = particles.filter((particle) => particle.is_boson )
      // const baryons = particles.filter((particle) => particle.is_baryon )
      // let leptons = particles.filter((particle) => particle.is_lepton)
      // setLeptons(leptons)
      // const mesons = particles.filter((particle) => particle.is_meson )
      // let quarks = particles.filter((particle) => particle.is_quark )
      // setQuarks(quarks)
      // console.log(bosons)
      // console.log(baryons)
      // console.log(leptons)
      // console.log(mesons)
      // console.log(quarks)
    } catch (err) {
      console.log(err);
    }
    console.timeEnd('fetchParticles');
  };  

  
  useEffect(() => {
    fetchParticles();
    // минин эту функцию расписал внутри самого хука почему
  }, []);  

  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    // gridTemplateRows: "repeat(3, 100px)"
  }

  console.log("found language for particle operations page:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  
  
  const handleFilter = (e) =>{
    console.log("Selected filter option:", e.target.value)
    let fp = particles.filter(particle => {
            switch(e.target.value)
            {
              case "show_all": return true;
              case "bosons": return particle.is_boson;
              case "barions": return particle.is_baryon;
              case "leptons": return particle.is_lepton;
              case "mesons": return particle.is_meson;
              case "quarks": return particle.is_quark;
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

      <ReactModal 
        isOpen={modalForEditNameIsOpen}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={closeModal}
      >
          {modalContentForName}
      </ReactModal>

      <ModalForDescription isOpen={modalForDescriptionIsOpen}></ModalForDescription>

      
      <h1>Particle operations page</h1>
      

        <button
          className="modal-show-button"
          onClick={() => setModalForEditNameIsOpen(true)}
        >
          Add/edit particle name
        </button>

        <button
          className="modal-show-button"
          onClick={() => setModalForDescriptionIsOpen(true)}
        >
          Add/edit description
        </button>

      <label>отфильтровать только</label>
        &nbsp;
        <select name="compararComParticle" onChange={handleFilter}>
          <option value={'show_all'}>show all particles</option>
          <option value={'bosons'}>бозоны</option>
          <option value={'mesons'}>мезоны</option>
          <option value={'barions'}>барионы</option>
          <option value={'quarks'}>кварки</option>
          <option value={'leptons'}>лептоны</option>
          {/* {particles.map(particle => <option key={particle.baseid} value={particle.baseid}>{particle.name_ru}</option>)} */}
        </select>
        &nbsp;
        всего найдено частиц: <b>{filteredParticles.length}</b>
        &nbsp;
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
      {filteredParticles.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
      </div>  
      
    </div>


  )
}

export default ParticleOperations
