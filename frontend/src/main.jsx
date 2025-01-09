import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";


import AboutMe from './pages/AboutMe';
import ParticleOperations from './pages/ParticleOperations';
import ParticleDetailsComparator from './pages/ParticleDetailsComparator'
import HomePage from './pages/Home';
import MesonsPage from './pages/Mesons.jsx';
import BarionsPage from './pages/Barions.jsx';
import HowToUsePage from './pages/HowToUse.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <App />    
      <Routes>
        <Route index path="/" element={<HomePage />}></Route>
        <Route path="/particle-operations" element={<ParticleOperations />}></Route>
        <Route path="/particle-detail" element={<ParticleDetailsComparator />}></Route>
        <Route path="/particle-details/:baseid" element={<ParticleDetailsComparator />}></Route>
        <Route path="/about" element={<AboutMe />}></Route>
        <Route path="/mesons" element={<MesonsPage />}></Route>
        <Route path="/barions" element={<BarionsPage />}></Route>
        <Route path="/explaine" element={<HowToUsePage />}></Route>
      </Routes>

      
    </BrowserRouter>
  </StrictMode>,
)
