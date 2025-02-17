import './Navbar.css';
import {NavLink} from "react-router";
import { useState, useEffect, React} from 'react'



export default function Navbar() {
  // const [particles, setParticles] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("");


  
  // useEffect(() => {
  //   fetchParticles();
  //   // минин эту функцию расписал внутри самого хука почему
  // }, []);  

  

  const handleLanguageSelect = (e) => {
    setSelectedLanguage(e.target.value)
    localStorage.setItem('selectedLanguage', selectedLanguage);
    console.log("selected language now is:", selectedLanguage)
    }

  return (
    <nav className='navigation-menu'>
        <ol>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/explaine"}>How to use</NavLink></li>
            {/* <li><NavLink to={"/mesons"}>Mesons</NavLink></li>
            <li><NavLink to={"/barions"}>Barions</NavLink></li> */}
            <li><NavLink to={"/particle-operations"}>All particles </NavLink></li>
            <li><NavLink to={"/particle-detail"}>Particle details</NavLink></li>
            <li><NavLink to={"/about"}>About</NavLink></li>
            <li id="group1">
              <span>
                <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="en" onClick={handleLanguageSelect} /> EN | 
                <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="pt" onClick={handleLanguageSelect}/> PT | 
                <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="ru" onClick={handleLanguageSelect}/>  RU 
              </span>
            </li>
        </ol>
    </nav>

  )
}

