import React from 'react';
import { useState, useEffect } from 'react'
import greenButton from '/images/strict_button.webp'
import ParticleCard from '../components/ParticleCard/PacticleCard';

import { API_PARTICLES_URL } from "../constants"; 



function ParticleOperations() {
  const [particles, setParticles] = useState([])

  const fetchParticles = async () => {
    // console.time('fetchParticles');
  
    try {
      const response = await fetch(API_PARTICLES_URL);
      const particles = await response.json();
      // console.log(particles)
      setParticles(particles);
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

  return (
    <div>
        <h1>Particle operations page</h1>
      
      <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group</a> | 
      <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="https://redketchup.io/color-picker" target='blank'> color picker</a> | 
      <a href="https://docs.djangoproject.com/en/5.1/" target='blank'> django</a> | 
      <a href="https://reactcommunity.org/react-modal/" target='blank'> react-modal</a> | 
      <a href="https://react-hot-toast.com/docs" target='blank'> toast notifications</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> | 
      <hr></hr>
      <img src={greenButton} alt="bsdf" />

      {particles.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
    </div>


  )
}

export default ParticleOperations
