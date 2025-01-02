import standartModel from '/images/standart_model.png'


function HomePage() {
  return (
    <div>
        <h1>Стандартная модель элементарных частиц </h1>
        <a href="https://pdg.lbl.gov/2024/api/index.html" target="_blank">
          <img src={standartModel} className="logo" alt="standart model picture" />
        </a>

      <hr></hr>
    </div>

  )
}

export default HomePage
