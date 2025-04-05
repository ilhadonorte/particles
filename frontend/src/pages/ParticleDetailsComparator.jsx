import { useState, useEffect, useContext } from 'react'
import { ParticlesContext } from '../ParticlesContext'
import { API_PARTICLES_URL, API_PDG_REST_URL  } from "../constants"; 
import { useParams } from "react-router";

import diquarks_and_spin from "/images/diquarks_differetn_spin_expl_charge.png"

import toast
 from 'react-hot-toast';
// import ReactModal from 'react-modal';
import ModalForDescription from '../components/ModalForDescription/ModalForDescription';



function ParticleDetailComparator() {

  // const [particles, setParticles] = useState([])
  const particles = useContext(ParticlesContext)

    const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);
  
    const [modalForDescriptionIsOpen, setModalForDescriptionIsOpen] = useState(false);
  
  let params = useParams()
  console.log(params.baseid)

  let urlForAllDetails = API_PDG_REST_URL + params.baseid 

  // const fetchParticles = async () => {
  //   console.time('fetchParticles');
  
  //   try {
  //     const response = await fetch(API_PARTICLES_URL);
  //     const particles = await response.json();
  //     setParticles(particles)
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.timeEnd('fetchParticles');
  // };  
  
    
  // useEffect(() => {
  //   fetchParticles();
  //   // минин эту функцию расписал внутри самого хука почему
  // }, []);  
  

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

            {/* <ReactModal 
        isOpen={modalForEditNameIsOpen}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={closeModal}
      >
          {modalContentForName}
      </ReactModal> */}

<ModalForDescription isOpen={modalForDescriptionIsOpen}></ModalForDescription>

      
<h1>Particles operations page</h1>


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
      {!params.baseid ? 'Частица не выбрана, выберите частицу из списка' : `выбрана частица ` + params.baseid } <br></br>

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
