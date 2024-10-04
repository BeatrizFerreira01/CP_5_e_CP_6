import React, { useEffect, useState } from 'react';
import { getWeather } from '../api.ts';
import '../src/index.css'; // Assegure-se de que o CSS está importado

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
  const [location, setLocation] = useState(''); // Localização padrão removida
  const [error, setError] = useState(false);

  useEffect(() => {
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
  
    fetchWeather();
  }, [location]);

  return (
    <div>
      {/* Removido o cabeçalho duplicado */}
      <div className="search-section">
        <div className="input-wrapper">
          <input
            type="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Digite a localização"
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
            alert("Localização não acessada. Por favor, habilite as permissões para usar este recurso.");
          }
        )}>
          Inserir localização atual
        </button>
      </div>

      {error ? (
        <div className="no-results">
          <img src="/src/assets/no-result.svg" alt="Nenhum resultado encontrado" className="icon" />
          <h3 className="title">Algo deu errado!</h3>
          <p className="message">
            Não conseguimos recuperar os detalhes do clima. Certifique-se de ter inserido uma cidade válida ou tente novamente mais tarde.
          </p>
        </div>
      ) : (
        weather && (
          <div className="weather-section">
            <div className="current-weather">
              <img src={weather.current.condition.icon} className="weather-icon" alt="Ícone do clima" />
              <h2 className="temperature">
                {weather.current.temp_c}<span>°C</span>
              </h2>
              <h5 className="description">{weather.current.condition.text}</h5>
            </div>
            {/* Previsão Horária */}
            <div className="hourly-weather">
              <ul className="weather-list"></ul>
            </div>
          </div>
        )
      )}

      {/* Linha de separação */}
      <hr className="separator" />

      {/* Aqui você pode adicionar a seção de Targets */}
    </div>
  );
};

export default Weather;
