// src/components/Weather.tsx
import React, { useEffect, useState } from 'react';
import { getWeather } from '../api';
import '../index.css'; // Assegure-se de que o CSS está importado

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('São Paulo'); // Localização padrão
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    try {
      const response = await getWeather(location);
      setWeather(response.data);
      setError(false);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(true);
    }
  };

  return (
    <div>
      <div className="search-section">
        <div className="input-wrapper">
          <span className="material-symbols-rounded">search</span>
          <input
            type="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city name"
            className="search-input"
          />
        </div>
        <button className="location-button" onClick={() => navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await getWeather(`${latitude},${longitude}`);
              setWeather(response.data);
              setLocation(response.data.location.name);
              setError(false);
            } catch (err) {
              console.error('Error fetching weather data:', err);
              setError(true);
            }
          },
          () => {
            alert("Location access denied. Please enable permissions to use this feature.");
          }
        )}>
          <span className="material-symbols-rounded">my_location</span>
        </button>
      </div>

      {error ? (
        <div className="no-results">
          <img src="/src/assets/no-result.svg" alt="No results found" className="icon" />
          <h3 className="title">Something went wrong!</h3>
          <p className="message">
            We're unable to retrieve the weather details. Ensure you've entered a valid city or try again later.
          </p>
        </div>
      ) : (
        weather && (
          <div className="weather-section">
            <div className="current-weather">
              <img src={weather.current.condition.icon} className="weather-icon" alt="Weather icon" />
              <h2 className="temperature">
                {weather.current.temp_c}<span>°C</span>
              </h2>
              <h5 className="description">{weather.current.condition.text}</h5>
            </div>
            {/* Previsão Horária */}
            <div className="hourly-weather">
              {/* Aqui você pode adicionar a lógica para exibir a previsão horária */}
              <ul className="weather-list">
                {/* Exemplo de previsão horária */}
                {/* 
                {weather.forecast.forecastday[0].hour.map((hour) => (
                  <li key={hour.time} className="weather-item">
                    <p className="time">{hour.time.substring(11, 16)}</p>
                    <img src={hour.condition.icon} className="weather-icon" alt="Weather icon" />
                    <p className="temperature">{hour.temp_c}°</p>
                  </li>
                ))} 
                */}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
