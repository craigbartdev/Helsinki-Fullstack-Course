import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log("fetching weather")
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
      .then(res => {
        setWeather({ 
          temp: res.data.main.temp, 
          icon: res.data.weather[0].icon,
          speed: res.data.wind.speed,
          deg: res.data.wind.deg, 
          desc: res.data.weather[0].main
        })
      })
  }, [capital])

  const degToCompass = (num) => {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", 
      "ESE", "SE", "SSE", "S", "SSW", "SW", 
      "WSW", "W", "WNW", "NW", "NNW"];
      
    return arr[(val % 16)];
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <b>Temperature: </b> {weather.temp} &#176;F <br />
      <img 
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.desc}
      /> <br/>
      <b>Wind:</b> {weather.speed} MPH direction {degToCompass(weather.deg)}
    </div>
  )
}

export default Weather