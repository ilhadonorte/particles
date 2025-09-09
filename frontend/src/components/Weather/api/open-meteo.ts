

import { API_PDG_REST_URL, API_NAME_URL } from "../../../constants"; 


import { fetchWeatherApi } from 'openmeteo';

class Cidade {
    name: string;
    latitude: number;
    longitude: number;
    temperatura: number;
    
  constructor(name, latitude, longitude, temperatura = -33) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude
    this.temperatura = temperatura
  }
}

let cidades: Cidade[] = []

let Londrina = new Cidade("Londrina", -23.3103, -51.1628)
let Voronezh = new Cidade("Voronezh", 51.672, 39.1843)

cidades.push(Londrina, Voronezh)
console.log("Вручную введен следующий список городов:", cidades)

// надо сделать 2 массива, они используются для запроса попарно
const latitudes = cidades.map(obj => obj.latitude)
const longitudes = cidades.map(obj => obj.longitude)

const params = {
    "latitude": [...latitudes],
    "longitude": [...longitudes],
    "hourly": ["temperature_2m", "rain", "surface_pressure", "wind_speed_10m"],
    "forecast_days": 1,
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process 2 locations
for (const response of responses) {
    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    console.log(
        `Из api.open-meteo.com пришли следующие данные на обработку:`,
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );
    
    const hourly = response.hourly()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            rain: hourly.variables(1)!.valuesArray(),
            surface_pressure: hourly.variables(2)!.valuesArray(),
            wind_speed_10m: hourly.variables(3)!.valuesArray(),
        },
    };
    
    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    // console.log("\nHourly data", weatherData.hourly)
    
    
    cidades.forEach(cidade => {
        
        if (longitude == cidade.longitude){
            if (weatherData.hourly.surface_pressure[0] != null){ 
                cidade.temperatura = weatherData.hourly.temperature_2m[0]
                console.log(
                    cidade.name, 
                    cidade.longitude, 
                    typeof(cidade.longitude), longitude, 
                    cidade.temperatura, 
                    longitude === cidade.longitude)
            }
            else {console.log("Не пришли данные по температуре")}
        } 
        }   
    )

}

export {cidades}