import standartModel from '/images/standart_model.png'
import { useState, useEffect } from 'react'

function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  // useEffect(() => {
  //   localStorage.setItem('selectedLanguage', selectedLanguage);
  //   }, []);

const handleLanguageSelect = (e) => {
  setSelectedLanguage(e.target.value)
  localStorage.setItem('selectedLanguage', selectedLanguage);
  console.log("selected language now is:", selectedLanguage)
  }

  // localStorage.getItem("selectedLanguage") || "No Title";
  console.log("found language for homepag:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
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
      <p class="blink">Внимание. Здесь сделать страницу описания: первая характеристика спин от неё начинают рассыпаться все остальные</p>
    </div>

  )
}

export default HomePage
