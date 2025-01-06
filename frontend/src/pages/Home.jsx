import standartModel from '/images/standart_model.png'
import { useState, useEffect } from 'react'

function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  // useEffect(() => {
  //   localStorage.setItem('selectedLanguage', selectedLanguage);
  //   }, []);

const handleLanguageSelect = (e) => {
    console.log("selected language:", selectedLanguage)
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setSelectedLanguage(e.target.value)
  }

  return (
    <div>
        <h1>Стандартная модель элементарных частиц </h1>

        <form>
              <div id="group1">
              Добавить селекторы для языка: 
              <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="en" onClick={handleLanguageSelect} /> EN | 
              <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="pt" onClick={handleLanguageSelect}/> PT | 
              <input type="radio" className="form-check-input" name="radio_relevance_price_distance" value="ru" onClick={handleLanguageSelect}/>  RU 
              
              <br></br>
            </div>
          </form>

          сравнивать с массой:
              <select>ddd</select>
              <br></br>

        <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={standartModel} className="logo" alt="standart model picture" />
        </a>

      <hr></hr>
    </div>

  )
}

export default HomePage
