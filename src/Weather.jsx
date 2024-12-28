import React, { useState } from 'react';
import searchicon from './assets/search.png';
import storm from './assets/storm.png';
import sun from './assets/sun.png';
import snow from './assets/snow.png';
import weathericon from './assets/weather-app.png';

const Weather = () => {
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
    };

    return (
        <div className="bg-gradient-to-r from-cyan-600 via-blue-500 to-sky-400 w-full h-screen flex justify-center items-center">
            <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col h-auto justify-center items-center md:w-[40%]">
                <h1 className="text-gray-800 font-bold text-4xl mb-6">Weather App</h1>
                <div className="w-full flex gap-4 items-center justify-center">
                    <input
                        type="text"
                        placeholder="Enter City"
                        className="h-12 w-[70%] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div
                        className="bg-cyan-100 p-3 rounded-lg hover:bg-cyan-600 transition duration-300 cursor-pointer"
                        onClick={handleClick}
                    >
                        <img src={searchicon} alt="Search" className="h-6" />
                    </div>
                </div>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                <div className="mt-8 w-full flex flex-col items-center">
                    {weather && (
                        <div className="flex flex-col items-center gap-5 w-full">
                            <div>
                                {weather?.weather?.[0]?.main === 'Thunderstorm' && (
                                    <img src={storm} alt="Thunderstorm Weather" className="h-20" />
                                )}
                                {weather?.weather?.[0]?.main === 'Clouds' && (
                                    <img src={weathericon} alt="Cloudy Weather" className="h-20" />
                                )}
                                {weather?.weather?.[0]?.main === 'Rain' && (
                                    <img src={storm} alt="Rainy Weather" className="h-20" />
                                )}
                                {weather?.weather?.[0]?.main === 'Clear' && (
                                    <img src={sun} alt="Sunny Weather" className="h-20" />
                                )}
                                {weather?.weather?.[0]?.main === 'Haze' && (
                                    <img src={weathericon} alt="Hazy Weather" className="h-20" />
                                )}
                                {!['Thunderstorm', 'Clouds', 'Rain', 'Clear', 'Haze'].includes(weather?.weather?.[0]?.main) && (
                                    <img src={snow} alt="Default Snow Weather" className="h-20" />
                                )}
                            </div>
                            <h1 className="text-gray-800 font-bold text-2xl">
                                City: <span className="text-cyan-600">{weather.name}</span>
                            </h1>
                            <h1 className="text-gray-800 font-bold text-2xl">
                                Temperature: <span className="text-cyan-600">{weather.main.temp}°C</span>
                            </h1>
                            <h1 className="text-gray-800 font-bold text-2xl">
                                Weather: <span className="text-cyan-600">{weather.weather[0].main}</span>
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
