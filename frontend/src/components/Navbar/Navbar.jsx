import React from 'react';
import './Navbar.css';
import {Link} from "react-router";

function Navbar() {
  return (
    <div className='navigation-menu'>
        <ol>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/mesons"}>Mesons</Link></li>
            <li><Link to={"/barions"}>Barions</Link></li>
            <li><Link to={"/particle-operations"}>Particle operations</Link></li>
            <li><Link to={"/particle-detail"}>Particle details</Link></li>
            <li><Link to={"/about"}>About</Link></li>
        </ol>
    </div>

  )
}

export default Navbar
