import { useState, useEffect } from 'react'
import './App.css'
import ParticleCard from './components/ParticleCard/PacticleCard';
import ParticlesGroup from './components/ParticlesGroup/ParticlesGroup';
import { API_NAME_URL } from "./constants"; 

// import { SimpleModal } from "./components/SimpleModal/SimpleModal";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar/Navbar';


const notify = () => toast.success('Here is your toast.',
   {
    duration: 5000,
    position: 'top-right'
  }
  
);

function App() {
  const [count, setCount] = useState(0)
 
  const [leptons, setLeptons] = useState([])
  const [quarks, setQuarks] = useState([])


 



 


  const openModal = () => {
    setModalIsOpen(true);
  };
  






  return (
    <>
    <Navbar></Navbar>

      <div>


        {/* <SimpleModal
          isOpen={modalForEditNameIsOpen}    
          onClose={() => setModalForEditNameIsOpen(false)}
        >
          <p>


          </p>
        </SimpleModal> */}
      
     
      <Toaster />

      <button onClick={() => setCount((count) => {
          count + 1; 
          // setModalIsOpen(!modalIsOpen);
          notify();
          })}>
          проверить тоаст {count}
        </button>
      

      </div>

      Лептоны:
      {/* <ParticlesGroup particlesGroup={leptons}></ParticlesGroup> <br></br> */}
      Кварки:
      {/* <ParticlesGroup particlesGroup={quarks}></ParticlesGroup> <br></br> */}

      
      
    </>
  )
}

export default App
