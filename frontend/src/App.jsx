import { useState, useEffect } from 'react'
import './App.css'
import { API_NAME_URL } from "./constants"; 

import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar/Navbar';

// import { useContext } from 'react';
import { ParticlesContext } from './ParticlesContext.js';


function App() {

 


  return (
    <>
    <ParticlesContext.Provider value={ParticlesContext}>
      <Navbar></Navbar>
      <Toaster />
    </ParticlesContext.Provider>
    </>
  )
}

export default App
