import React, { useState } from 'react';
import searchicon from './assets/search.png';
import storm from './assets/storm.png';
import sun from './assets/sun.png';
import weathericon from './assets/weather-app.png';

const Weatherapp = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiBase = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "3ba3ae61ba346811750521094f0d487e";

  const handleClick = async () => {
    if (search.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    try {
      const response = await fetch(`${apiBase}?q=${search}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const weatherIcons = {
    Thunderstorm: storm,
    Clouds: weathericon,
    Rain: storm,
    Clear: sun,
    Haze: weathericon,
  };

  return (
    <div className='bg-black w-full h-screen flex justify-center items-center'>
      <div className='bg-gradient-to-r from-cyan-900 via-blue-800 to-sky-800 p-4 flex flex-col gap-10 h-screen justify-center items-center w-[50%]'>
        <h1 className='text-white font-bold text-4xl'>Weather App</h1>
        <div className='w-full h-fit flex gap-5 items-center justify-center p-10'>
          <input
            type="text"
            placeholder='search'
            className='h-fit w-[50%] p-2 rounded-xl'
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='size-10 bg-white p-2 rounded-xl hover:scale-110 hover:cursor-pointer hover:shadow-lg'>
            <img src={searchicon} alt="Search" onClick={handleClick} />
          </div>
        </div>
        {error && <div className='text-red-500'>{error}</div>}
        <div className='w-full h-[50%] flex flex-col items-center justify-center'>
          {weather && (
            <div className='flex flex-col items-center gap-5 justify-center w-full'>
              <div>
                <img src={weatherIcons[weather.weather[0].main]} alt="Weather Icon" className='size-32' />
              </div>
              <h1 className='text-white font-bold text-4xl p-2'>City name : {weather.name}</h1>
              <h1 className='text-white text-3xl font-bold p-2'>Temperature : <span className='text-2xl'>{weather.main.temp}°C</span></h1>
              <h1 className='text-white text-3xl font-bold p-2'>Weather : <span className='text-2xl'>{weather.weather[0].main}</span></h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weatherapp;


  // 3ba3ae61ba346811750521094f0d487e
