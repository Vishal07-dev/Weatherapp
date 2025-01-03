// import { useState } from 'react'
import React, { useState } from 'react'
import searchicon from './assets/search.png'
import strom from './assets/storm.png'
import sun from './assets/sun.png'
import weathericon from './assets/weather-app.png'


const Weatherapp = () => {

  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);

  const apiBase = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "3ba3ae61ba346811750521094f0d487e";


  const clickhandle = () => {
    if (search.trim() === '') alert('Please enter a city name');
    fetch(`${apiBase}?q=${search}&units=metric&appid=${apiKey}`)
      .then((response) => {
        if (!response.ok) throw new Error('City not found');
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        // console.log(data);

      })
      .catch((error) => {
        alert(error);
      })

    // setSearch('');
  }
  //write above work flow in book

  return (
    <>
      <div className='bg-black w-full h-screen flex  justify-center items-center'>
        <div className='bg-gradient-to-r from-cyan-900 via-blue-800 to-sky-800 p-4  flex flex-col gap-10 h-screen justify-center   items-center  w-[50%]'>
          <h1 className='text-white font-bold text-4xl'>Weather App</h1>
          <div className=' w-full h-fit flex gap-5 items-center justify-center p-10'>
            {/* <input type="text" name="" id="" className='h-fit w-[50%] relative p-4 rounded-xl'/>
               <img src={searchicon} alt="" className='text-white size-8 ml-[18%]  absolute'/> */}
            <input
              type="text"
              name="" id=""
              placeholder='search'
              className='h-fit w-[50%]  p-2 rounded-xl'
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='size-10 bg-white p-2 rounded-xl  hover:scale-110 hover:cursor-pointer hover:shadow-lg'>
              <img src={searchicon} alt="" onClick={clickhandle} />
            </div>
          </div>
          <div className='w-full h-[50%]  flex flex-col items-center justify-center '>
            {weather && (
              <div className='flex flex-col items-center gap-5 justify-center  w-full '>
                {weather?.weather?.[0]?.main === 'Thunderstorm' && (
                  <div>
                    <img src={strom} alt="Rainy Weather" className='size-25'/>
                  </div>
                )}
                {weather?.weather?.[0]?.main === 'Clouds' && (
                  <div>
                    <img src={weathericon} alt="Rainy Weather" className='size-32'/>
                  </div>
                )}
                  {weather?.weather?.[0]?.main === 'Rain' && (
                  <div>
                    <img src={strom} alt="Rainy Weather" className='size-32'/>
                  </div>
                )}
                {weather?.weather?.[0]?.main === 'Clear' && (
                  <div>
                    <img src={sun} alt="Rainy Weather" className='size-32'/>
                  </div>
                )}
                 {weather?.weather?.[0]?.main === 'Haze' && (
                  <div>
                    <img src={weathericon} alt="Rainy Weather" className='size-32'/>
                  </div>
                )}
                <h1 className='text-white font-bold text-4xl p-2'>City name : {weather.name}</h1>
                <h1 className='text-white text-3xl font-bold p-2'>Temprature : <span className='text-2xl '> {weather.main.temp}°C</span></h1>
                <h1 className='text-white text-3xl font-bold p-2'>Weather : <span className='text-2xl '>{weather.weather[0].main}</span></h1>

              </div>
            )}
            {/* //write this in book why it not rendered at first time why condtional randering is used write all of this stuff */}
          </div>
        </div>

      </div>
    </>
  )
}

export default Weatherapp


  // 3ba3ae61ba346811750521094f0d487e
