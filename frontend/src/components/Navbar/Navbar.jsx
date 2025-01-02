import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='navigation-menu'>
        <ol>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/particle-operations"}>particle-operations</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/particle-detail"}>pd</Link></li>
        </ol>
    </div>

  )
}

export default Navbar
