import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import greenButton from '/images/strict_button.webp'

    var today = new Date();
    var birthday = new Date("1981-7-6")
    var radik_ended = new Date("2005-2-25")
    var portugues_started = new Date("2010-11-25")
    var odu_dropped = new Date("2012-10-18")
    var beasil_arrival = new Date("2021-3-11")
    var war_started = new Date("2022-02-24")
    var florao_moved = new Date("2021-9-2")
    var jf_trab = new Date("2024-01-25")
    var jaguapita_moved = new Date("2024-08-22")
    var project_invented = new Date("2022-07-22")
    var car_comprado = new Date("2024-11-14")

    var age = Math.ceil((today - birthday) / (1000 * 3600 * 24));
    var r_e = Math.ceil((today - radik_ended) / (1000 * 3600 * 24));
    var p_s = Math.ceil((today - portugues_started) / (1000 * 3600 * 24));
    var o_d = Math.ceil((today - odu_dropped) / (1000 * 3600 * 24));
    var b_a = Math.ceil((today - beasil_arrival) / (1000 * 3600 * 24));
    var w_s = Math.ceil((today - war_started) / (1000 * 3600 * 24));
    var f_m = Math.ceil((today - florao_moved) / (1000 * 3600 * 24));
    var j_t = Math.ceil((today - jf_trab) / (1000 * 3600 * 24));
    var j_m = Math.ceil((today - jaguapita_moved) / (1000 * 3600 * 24));
    var p_i = Math.ceil((today - project_invented) / (1000 * 3600 * 24));
    var c_c = Math.ceil((today - car_comprado) / (1000 * 3600 * 24));
  //  console.log(age)
  // https://calcus.ru/kalkulyator-dnej?input=eyJ0eXBlIjoiMiIsImRhdGUxIjoiMjAyNC0wOS0wOCIsImRhdGUyIjoiMjAyNS0wMS0wMiIsImluY2x1ZGVfc3RhcnRfZGF0ZSI6IjEifQ==
function AboutMe() {
  const [count, setCount] = useState(0)

  const notify = () => toast.success('Here is your toast.',
    {
     duration: 5000,
     position: 'top-right'
   }
   
 );
  return (
    <div>
        <h1>About Me Page</h1>
        <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group</a> | 
      <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="https://redketchup.io/color-picker" target='blank'> color picker</a> | 
      <a href="https://docs.djangoproject.com/en/5.1/" target='blank'> django</a> | 
      <a href="https://reactcommunity.org/react-modal/" target='blank'> react-modal</a> | 
      <a href="https://react-hot-toast.com/docs" target='blank'> toast notifications</a> | 
      <a href="https://react.dev/reference/react-dom/components/select" target='blank'> react.dev</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> | 
      <hr></hr>
        <p>
          Сегодня: {today.toLocaleDateString('ru-Ru')} <br></br>
          {/* BD: {birthday.toDateString()} <br></br> */}
          {/* BD: {birthday.toLocaleDateString('ru-Ru')} <br></br> */}
          Я прожил уже: {age} дней ({(age/365).toFixed(2)} лет)<br></br>
          Радик закончен: {r_e} дней назад ({(r_e/365).toFixed(2)} лет назад)<br></br>
          Португальский учить начал: {p_s} дней назад ({(p_s/365).toFixed(2)} лет назад)<br></br>
          Бросил ОДУ: {o_d} дней назад ({(o_d/365).toFixed(2)} лет назад)<br></br>
          В Бразилию уехал: {b_a} дней назад ({(b_a/365).toFixed(2)} лет назад)<br></br>
          Война началась: {w_s} дней назад ({(w_s/365).toFixed(2)} лет назад)<br></br>
          Вынужденно живу в парана: {f_m} дней ({(f_m/365).toFixed(2)} лет)<br></br>
          В жагвафранге мучаюсь уже: {j_t} дней ({(j_t/365).toFixed(2)} лет)<br></br>
          Перебрался в Jaguapitã: {j_m} дней назад ({(j_m/365).toFixed(2)} лет)<br></br>
          Проект придуман: {p_i} дней назад, но кажется была мысль и раньше ({(p_i/365).toFixed(2)} лет назад)<br></br>
          Машину купил: {c_c} дней назад ({(c_c/365).toFixed(2)} лет назад)<br></br>

          <br></br>
        </p>

        <button onClick={() => setCount((count) => {
          count + 1; 
          notify();
          })}>
          проверить тоаст {count}
        </button> <br></br>
        
      <img src={greenButton} alt="bsdf" />
      <hr></hr>
    </div>

  )
}

export default AboutMe
