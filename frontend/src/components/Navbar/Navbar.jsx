import React from 'react';
import './Navbar.css';
import {NavLink} from "react-router";

function Navbar() {
  return (
    <nav className='navigation-menu'>
        <ol>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/mesons"}>Mesons</NavLink></li>
            <li><NavLink to={"/barions"}>Barions</NavLink></li>
            <li><NavLink to={"/particle-operations"}>Particle operations</NavLink></li>
            <li><NavLink to={"/particle-detail"}>Particle details</NavLink></li>
            <li><NavLink to={"/about"}>About</NavLink></li>
        </ol>
    </nav>

  )
}

export default Navbar
