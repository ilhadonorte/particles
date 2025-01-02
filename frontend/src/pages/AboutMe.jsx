
    var today = new Date();
    var birthday = new Date("1981-7-6")
    var radik_ended = new Date("2005-2-25")
    var portugues_started = new Date("2010-11-25")
    var odu_dropped = new Date("2012-10-18")
    var beasil_arrival = new Date("2021-3-11")
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
    var f_m = Math.ceil((today - florao_moved) / (1000 * 3600 * 24));
    var j_t = Math.ceil((today - jf_trab) / (1000 * 3600 * 24));
    var j_m = Math.ceil((today - jaguapita_moved) / (1000 * 3600 * 24));
    var p_i = Math.ceil((today - project_invented) / (1000 * 3600 * 24));
    var c_c = Math.ceil((today - car_comprado) / (1000 * 3600 * 24));
  //  console.log(age)
  // https://calcus.ru/kalkulyator-dnej?input=eyJ0eXBlIjoiMiIsImRhdGUxIjoiMjAyNC0wOS0wOCIsImRhdGUyIjoiMjAyNS0wMS0wMiIsImluY2x1ZGVfc3RhcnRfZGF0ZSI6IjEifQ==
function AboutMe() {
  return (
    <div>
        <h1>About Me Page</h1>
        <p>
          Сегодня: {today.toLocaleDateString('ru-Ru')} <br></br>
          {/* BD: {birthday.toDateString()} <br></br> */}
          {/* BD: {birthday.toLocaleDateString('ru-Ru')} <br></br> */}
          Я прожил уже: {age} дней<br></br>
          Радик закончен: {r_e} дней назад <br></br>
          Португальский учить начал: {p_s} дней назад <br></br>
          Бросил ОДУ: {o_d} дней назад<br></br>
          В Бразилию уехал: {b_a} дней назад<br></br>
          Вынужденно живу в парана: {f_m} дней<br></br>
          В жагвафранге мучаюсь уже: {j_t} дней<br></br>
          Перебрался в Jaguapitã: {j_m} дней назад<br></br>
          Проект придуман: {p_i} дней назад, но кажется была мысль и раньше <br></br>
          Машину купил: {c_c} дней назад<br></br>
          <br></br>
        </p>


      <hr></hr>
    </div>

  )
}

export default AboutMe
