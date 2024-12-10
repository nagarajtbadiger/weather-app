import React from 'react';
import './current-weather.css';

const CurrentWeather = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>; // Display loading text if data is not yet available
  }

  // Destructure relevant properties from the data object
  const {
    city: city,
    weather,
    main: { temp, feels_like, humidity },
    visibility: visibility,
    wind: { speed: windSpeed }
  } = data;
   
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{city}</p>
          <p className="weather-description">{weather[0]?.description}</p>
        </div>
        <img alt='weather' className='weather-icon' src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(feels_like)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{windSpeed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Visibility</span>
            <span className="parameter-value">{Math.round(visibility / 1000)} Kms </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
