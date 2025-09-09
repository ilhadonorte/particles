
import { useState } from "react";

import { cidades as todasCidades} from "../api/open-meteo";

export function WeatherVidget()
{
     const [cidades, setCidades] = useState([...todasCidades])
	 console.log("В компонент прилетело следующее: ", todasCidades)
	 let content = todasCidades.map(
		item => "В городе " +  item.name + "сейчас температура " + item.temperatura  
	 )
	//  setCidades(cidades)
    return(
        <>
            WeatherVidget data: <br></br>
            {content}

        </>
    )
}