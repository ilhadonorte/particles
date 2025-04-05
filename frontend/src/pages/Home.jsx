import { ParticlesContext } from '../ParticlesContext'
import standartModel from '/images/standart_model.png'
import { useState, useEffect, useContext } from 'react'

function HomePage() {
  const pc = useContext(ParticlesContext)
  console.log("particles from context at home page: ", pc)
  // useEffect(() => {
  //   localStorage.setItem('selectedLanguage', selectedLanguage);
  //   }, []);



  // localStorage.getItem("selectedLanguage") || "No Title";
  console.log("found language for homepag:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  return (
    <div>
      <h1>Стандартная модель элементарных частиц </h1>
      
      <label>
        сравнивать с массой: &nbsp;
        <select>
          <option>proton</option>
          <option>electron</option>
        </select>&nbsp;
        </label>
        
        <label>
          показать:&nbsp;
          <input type='checkbox' defaultChecked={true} onChange={console.log("show decays toggled")}/>распады &nbsp;
        </label>
        
        <label>
          <input type='checkbox' defaultChecked={false} onChange={console.log("show burns toggled")}/>рождения &nbsp;
        </label>
        
        <label>
          <input type='checkbox' defaultChecked={false} onChange={console.log("show charged states toggled")}/>заряженные состояния
        </label>  
           
        <br></br>

        <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={standartModel} className="logo" alt="standart model picture" />
        </a>

      <hr></hr>
      <p className="blink">Что означают эти числа?</p>
    </div>

  )
}

export default HomePage
