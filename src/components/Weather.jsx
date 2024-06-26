import React, { useEffect, useId, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
const Weather = () => {
    const [weather, setWeather] = useState(false)
    const inputRef = useRef()
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '11d': rain_icon,
        '11n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon
    }
    const search = async (city) => {
        if (city === "") {
            alert('Enter city name');
            return;
        }
        const apiKey = "d7850f503689fc4a61c3b47a6cddfbb4";

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json()
            const icons = allIcons[data.weather[0].icon] || clear_icon
            console.log(data);
            setWeather({
                humidity: data.main.humidity,
                temperature: data.main.temp,
                windSpeed: Math.floor(data.wind.speed),
                location: data.name,
                icon: icons

            })
        } catch (error) {
            setWeather(false)
            console.error('fetching error');
        }
    }
    useEffect(() => {
        search('hyderabad');
    }, [])
    return (
        <>
            <div className="weather">
                <div className="search-box">
                    <input type="text" ref={inputRef} placeholder='search' />
                    <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
                </div>
                {weather ? <>
                    <img src={weather.icon} alt="" className='weather-icon' />
                    <p className='teamperature'>{weather.temperature}&deg;c</p>
                    <p className='location'>{weather.location}</p>
                    <div className="weather-report">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{weather.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{weather.windSpeed}km/h</p>
                                <span>Wind</span>
                            </div>
                        </div>
                    </div>
                </> : <></>}

            </div>
        </>

    )
}

export default Weather
