import { useState } from 'react'
import reactLogo from './assets/react.svg'
import standartModel from '/standart_model.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Стандартная модель элементарных частиц </h1>

      <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> | 
      <hr></hr>

        <a href="https://vite.dev" target="_blank">
          <img src={standartModel} className="logo" alt="Vite logo" />
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
