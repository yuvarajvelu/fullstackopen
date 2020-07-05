import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Details = ({search}) => {
    const [weather, setWeather] = useState({});
    const capital = search[0].capital;
    let api = ('http://api.weatherstack.com/current?access_key='+process.env.REACT_APP_API_KEY).trim();
    api = api+'&query='+capital
    useEffect(()=>{
        axios
        .get(api)
        .then(response => {
            setWeather(response.data.current)
        })
    },[capital,api])
   
    return (
    <div>
        <h2>{search[0].name}</h2>
        <p>Capital: {search[0].capital}</p>
        <p>Population: {search[0].population}</p>
        <h3>Languages</h3>
        <ul>{search[0].languages.map(language => <li key = {language.nativeName}>{language.name}</li>)}</ul>
        <img src = {search[0].flag} alt = 'National flag' width="150" height="100" />
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.temperature} ºc</p>
        <img src = {weather.weather_icons} alt = 'weather pic' />
        <p>Wind: {weather.wind_speed}mph {weather.wind_dir}</p>
    </div>
    )
}

export default Details;