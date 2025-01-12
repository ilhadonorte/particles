import './Navbar.css';
import {NavLink} from "react-router";
import { useState, React} from 'react'

function Navbar() {
  const [selectedLanguage, setSelectedLanguage] = useState("");

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
            <li><NavLink to={"/mesons"}>Mesons</NavLink></li>
            <li><NavLink to={"/barions"}>Barions</NavLink></li>
            <li><NavLink to={"/particle-operations"}>Particle operations</NavLink></li>
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

export default Navbar
