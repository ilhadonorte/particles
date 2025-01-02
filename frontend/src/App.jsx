import { useState, useEffect } from 'react'
import standartModel from '/images/standart_model.png'
import greenButton from '/images/strict_button.webp'
import './App.css'
import ParticleCard from './components/ParticleCard/PacticleCard';
import ParticlesGroup from './components/ParticlesGroup/ParticlesGroup';
import { API_PARTICLES_URL, API_NAME_URL } from "./constants"; 
import ReactModal from 'react-modal';
import ModalForDescription from './components/ModalForDescription/ModalForDescription';
// import { SimpleModal } from "./components/SimpleModal/SimpleModal";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Here is your toast.',
   {
    duration: 5000,
    position: 'top-right'
  }
  
);

function App() {
  const [count, setCount] = useState(0)
  const [particles, setParticles] = useState([])
  const [leptons, setLeptons] = useState([])
  const [quarks, setQuarks] = useState([])

  const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);
  const [modalForDescriptionIsOpen, setModalForDescriptionIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("RU");
  const [formData, setFormData] = useState({
    baseid:"",
    name_en:"",
    name_ru:"",
    name_pt:""
  })
  // const axios = require('axios');

  useEffect(() => {
    fetchParticles();
    // минин эту функцию расписал внутри самого хука почему
  }, []);  

  const fetchParticles = async () => {
    // console.time('fetchParticles');

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
      let quarks = particles.filter((particle) => particle.is_quark )
      setQuarks(quarks)
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

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};  


  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    // setModalIsOpen(false);
    setModalForEditNameIsOpen(false);
  };

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




  const handleLanguageSelect = (e) => {
    console.log("selected language:", selectedLanguage)
    setSelectedLanguage(e.target.value)
  }

  return (
    <>
      <div>
        <ReactModal 
        isOpen={modalForEditNameIsOpen}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={closeModal}
        >
          {modalContentForName}
        </ReactModal>

      <ModalForDescription isOpen={modalForDescriptionIsOpen}></ModalForDescription>

        {/* <SimpleModal
          isOpen={modalForEditNameIsOpen}    
          onClose={() => setModalForEditNameIsOpen(false)}
        >
          <p>


          </p>
        </SimpleModal> */}
      
      <h1>Стандартная модель элементарных частиц </h1>
      <Toaster />
      <form>
         <div id="group1">
          Добавить селекторы для языка:
          <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="EN" onChange={handleLanguageSelect} checked /> EN | 
          <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="PT" onChange={handleLanguageSelect}/> PT | 
          <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="RU" onChange={handleLanguageSelect}/>  RU <img src={greenButton} alt="bsdf" />
          <br></br>
          <br></br>
        </div>
      </form>

      
      <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group</a> | 
      <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="https://redketchup.io/color-picker" target='blank'> color picker</a> | 
      <a href="https://docs.djangoproject.com/en/5.1/" target='blank'> django</a> | 
      <a href="https://reactcommunity.org/react-modal/" target='blank'> react-modal</a> | 
      <a href="https://react-hot-toast.com/docs" target='blank'> toast notifications</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> | 
      <hr></hr>

        <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={standartModel} className="logo" alt="Vite logo" />
        </a>
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => {
          count + 1; 
          // setModalIsOpen(!modalIsOpen);
          notify();
          })}>
          count is {count}
        </button>

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
        сравнивать с массой:
        <select>ddd</select>
      </div>

      Лептоны:
      <ParticlesGroup particlesGroup={leptons}></ParticlesGroup> <br></br>
      Кварки:
      <ParticlesGroup particlesGroup={quarks}></ParticlesGroup> <br></br>

      {particles.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
      
    </>
  )
}

export default App
