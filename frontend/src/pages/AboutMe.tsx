
import { useState } from 'react'

import toast, { Toaster } from 'react-hot-toast';

import greenButton from '/images/strict_button.webp'

import { DatePicker, message } from 'antd';

import dayjs from 'dayjs'


    

    const birthday = dayjs("1981-7-6")
    const radik_ended = dayjs("2005-2-25")
    const portugues_started = dayjs("2010-11-25")
    const odu_dropped = dayjs("2012-10-18")
    const beasil_arrival = dayjs("2021-3-11")
    const war_started = dayjs("2022-02-24")
    const florao_moved = dayjs("2021-9-2")
    const jf_trab = dayjs("2024-01-25")
    const jaguapita_moved = dayjs("2024-08-22")
    const project_invented = dayjs("2022-07-22")
    const car_comprado = dayjs("2024-11-14")
    const caiaque_comprado = dayjs("2025-03-12")


  //  console.log(age)
  // https://calcus.ru/kalkulyator-dnej?input=eyJ0eXBlIjoiMiIsImRhdGUxIjoiMjAyNC0wOS0wOCIsImRhdGUyIjoiMjAyNS0wMS0wMiIsImluY2x1ZGVfc3RhcnRfZGF0ZSI6IjEifQ==

function AboutMe() {

  const [count, setCount] = useState(0)
  
  const [selectedDate, setSelectedDate] = useState(dayjs())

  var today = dayjs();
      // var today = new Date();

  const diffInDays = selectedDate.diff(today, 'day');

  const notify = () => toast.success('Here is your toast.',
    {
     duration: 5000,
     position: 'top-right'
    }
   );
  
  console.log("today: ", {today}, "typeof today: ", typeof(today)); 
  console.log("selectedDate: ", {selectedDate}, "typeof selectedDate: ", typeof(selectedDate)); 
  // console.log({today} - {selectedDate});

   

  let age = selectedDate.diff(birthday, 'day');
  let r_e =  selectedDate.diff(radik_ended, 'day');
  let p_s =  selectedDate.diff(portugues_started, 'day');
  let o_d =  selectedDate.diff(odu_dropped, 'day');
  let b_a =  selectedDate.diff(beasil_arrival, 'day');
  let w_s =  selectedDate.diff(war_started, 'day');
  let f_m =  selectedDate.diff(florao_moved, 'day');
  let j_t =  selectedDate.diff(jf_trab, 'day');
  let j_m =  selectedDate.diff(jaguapita_moved, 'day');
  let p_i =  selectedDate.diff(project_invented, 'day');
  let c_c =  selectedDate.diff(car_comprado, 'day');
  let k_c =  selectedDate.diff(caiaque_comprado, 'day');

  return (
    <div>
        <h1>About Me Page</h1>
      <a href="https://pdg.lbl.gov/2024/api/index.html" target='blank'> pdg group api</a> | 
      <a href="https://pdglive.lbl.gov/Viewer.action" target='blank'> pdg group live</a> | 
      <a href="http://127.0.0.1:8000/api/particles/" target='blank'> api particles</a> | 
      <a href="http://127.0.0.1:8000/api/name/" target='blank'> api name</a> |
      <br></br>

      <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="https://redketchup.io/color-picker" target='blank'> color picker</a> | 
      <a href="https://docs.djangoproject.com/en/5.1/" target='blank'> django</a> | 
      <a href="https://www.django-rest-framework.org/" target='blank'> drf</a> | 
      <a href="https://reactcommunity.org/react-modal/" target='blank'> react-modal</a> | 
      <a href="https://react-hot-toast.com/docs" target='blank'> toast notifications</a> | 
      <a href="https://react.dev/reference/react-dom/components/select" target='blank'> react.dev</a> | 
      <a href="https://redis-py.readthedocs.io/en/stable/index.html" target='blank'> redis-py</a> | 
      <a href="https://ant.design/components/overview/" target='blank'> ant design</a> | 
       
      <hr></hr>
      
      
        {/* cегодня: {today.toLocaleDateString('ru-Ru')} */}
        cегодня: {today.format('YYYY-MM-DD')} {' '}
        {/* выбрана дата: {selectedDate} */}
        выбрана дата {' '}

        <DatePicker 
          onChange = {(date, dateString) => {
            let a = today.format('YYYY-MM-DD') 
            console.log("today: ", {today}, {a})
            console.log("selected date in DatePicker", {date}, "dateString:", {dateString})
            
            // console.log(diffInDays); // 16
            // const diffInDays = today.;
            console.log("difference: ", {diffInDays})
            setSelectedDate(date)
          }
        } 
        /> {' '}
        
        разница дней: {diffInDays} 
        <br></br>
          

          {/* BD: {birthday.toDateString()} <br></br> */}
          {/* BD: {birthday.toLocaleDateString('ru-Ru')} <br></br> */}
          Я прожил уже <b>{age}</b> дней или {(age/365).toFixed(2)} лет<br></br>
          Радик закончен <b>{r_e}</b> дней назад или {(r_e/365).toFixed(2)} лет назад<br></br>
          Португальский учить начал <b>{p_s}</b> дней назад или {(p_s/365).toFixed(2)} лет назад<br></br>
          Бросил ОДУ <b>{o_d}</b> дней назад или {(o_d/365).toFixed(2)} лет назад<br></br>
          В Бразилию уехал <b>{b_a}</b> дней назад или {(b_a/365).toFixed(2)} лет назад<br></br>
          Война началась <b>{w_s}</b> дней назад или {(w_s/365).toFixed(2)} лет назад<br></br>
          Вынужденно живу в парана <b>{f_m}</b> дней или {(f_m/365).toFixed(2)} лет<br></br>
          В жагвафранге мучаюсь уже <b>{j_t}</b> дней или {(j_t/365).toFixed(2)} лет<br></br>
          Перебрался в Jaguapitã <b>{j_m}</b> дней назад или {(j_m/365).toFixed(2)} лет<br></br>
          Проект придуман <b>{p_i}</b> дней назад, но кажется была мысль и раньше {(p_i/365).toFixed(2)} лет назад<br></br>
          Машину купил: <b>{c_c}</b> дней назад или {(c_c/365).toFixed(2)} лет назад<br></br>
          Каяк купил: <b>{k_c}</b> дней назад или {(k_c/365).toFixed(2)} лет назад<br></br>

          <br></br>
        

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
