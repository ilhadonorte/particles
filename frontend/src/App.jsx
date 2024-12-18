import { useState, useEffect } from 'react'
import standartModel from '/standart_model.png'
import './App.css'
import ParticleCard from './components/PacticleCard';
import ParticlesGroup from './components/ParticlesGroup';
import { API_PARTICLES_URL, API_NAMES_URL } from "./constants"; 
import ReactModal from 'react-modal';
import { SimpleModal } from "./components/SimpleModal/SimpleModal";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [particles, setParticles] = useState([])
  const [leptons, setLeptons] = useState([])
  const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    baseid:"",
    name_ru:"",
    name_pt:""
  })
  // const axios = require('axios');

  useEffect(() => {
    fetchParticles();
  }, []);  

  const fetchParticles = async () => {
    console.time('fetchParticles');

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
    console.timeEnd('fetchParticles');
  };  

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <div>
      <h2>Заголовок модального окна</h2>
      <p>Текст модального окна</p>
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

async function editParticleName()
  {
    axios.post({API_NAMES_URL}, 
      {
      firstName: 'Fred',
      lastName: 'Flintstone'
      })
    .then(function (response) 
      {
        console.log(response);
      })
    .catch(function (error) 
      {
        console.log(error);
      })
    .finally(function () 
      {
        // выполняется всегда
      });
  
  }


  return (
    <>
      <div>
        {/* <ReactModal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
    >
          React modal window here
          {modalContent}
        </ReactModal> */}
        
        <SimpleModal
          isOpen={modalForEditNameIsOpen}    
          onClose={() => setModalForEditNameIsOpen(false)}
        >
          <h2>Add/edit particle name..</h2>
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
        <br></br>
        <button >Save name </button>
          </p>
        </SimpleModal>
      
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
        <button onClick={() => setCount((count) => {count + 1; setModalIsOpen(!modalIsOpen)})}>
          count is {count}
        </button>

        <button
          className="modal-show-button"
          onClick={() => setModalForEditNameIsOpen(true)}
        >
          Add/edit particle name
        </button>
      </div>

      <ParticlesGroup particlesGroup={leptons}></ParticlesGroup> <br></br>

      {particles.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
      
    </>
  )
}

export default App
