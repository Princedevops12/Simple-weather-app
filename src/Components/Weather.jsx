import React, { useState } from 'react'
import './Weather.css'
import searchicon from '../assets/searchicon.png'
import cloudy from '../assets/cloudy.png'
import heavyRain from '../assets/heavy-rain.png'
import weatherImg from '../assets/weather.png'
import humidity from '../assets/humidity.png'
import storm from '../assets/storm.png'

const Weather = () => {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const apiKey = 'e9be24ae977b3831042e9070e05e8031'

  // Weather icon mapping based on OpenWeatherMap condition codes
  const weatherIcons = {
    '01d': 'https://openweathermap.org/img/wn/01d@2x.png',
    '01n': 'https://openweathermap.org/img/wn/01n@2x.png',
    '02d': 'https://openweathermap.org/img/wn/02d@2x.png',
    '02n': 'https://openweathermap.org/img/wn/02n@2x.png',
    '03d': 'https://openweathermap.org/img/wn/03d@2x.png',
    '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
    '04d': 'https://openweathermap.org/img/wn/04d@2x.png',
    '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
    '09d': 'https://openweathermap.org/img/wn/09d@2x.png',
    '09n': 'https://openweathermap.org/img/wn/09n@2x.png',
    '10d': 'https://openweathermap.org/img/wn/10d@2x.png',
    '10n': 'https://openweathermap.org/img/wn/10n@2x.png',
    '11d': 'https://openweathermap.org/img/wn/11d@2x.png',
    '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
    '13d': 'https://openweathermap.org/img/wn/13d@2x.png',
    '13n': 'https://openweathermap.org/img/wn/13n@2x.png',
    '50d': 'https://openweathermap.org/img/wn/50d@2x.png',
    '50n': 'https://openweathermap.org/img/wn/50n@2x.png'
  }

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return weatherIcons['01d']
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const handleSearch = async (city) => {
    if (search.trim() === '') {
      alert('please enter city name')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
      )
      if (!response.ok) {
        alert('City not found')
        setLoading(false)
        return
      }
      const data = await response.json()
      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        description: data.weather[0].description,
        iconCode: data.weather[0].icon
      })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching weather:', error)
      alert('Error fetching weather data')
      setLoading(false)
    }
  }

  const handleSearchClick = () => {
    handleSearch()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const displayTemp = weather ? weather.temp : '16'
  const displayCity = weather ? weather.city : 'London'
  const displayHumidity = weather ? weather.humidity : Math.floor(Math.random() * 100) + 1
  const displayWindSpeed = weather ? weather.windSpeed : Math.floor(Math.random() * 100) + 1
  const displayIcon = weather ? getWeatherIcon(weather.iconCode) : weatherIcons['01d']


  return (
    <div className='Weather'>
      <div className="searchbar">
        <input 
          type="text" 
          className='search' 
          placeholder='Search city...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img 
          src={searchicon} 
          alt="search icon" 
          className='weather-icon' 
          onClick={handleSearchClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="weather-preview">
        <img src={displayIcon} alt="current weather" className="main-weather" />
        <div className="weather-info">
        <p>{displayTemp}°C</p>  
        <p>{displayCity}</p>
          
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <img src={humidity} alt="humidity" className="detail-icon" />
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{displayHumidity}%</p>
        </div>

        <div className="detail-card">
          <img src={storm} alt="storm" className="detail-icon" />
          <p className="detail-label">Wind Speed</p>
          <p className="detail-value">{displayWindSpeed}m/s</p>
        </div>
      </div>
    </div>
  )
}

export default Weather
