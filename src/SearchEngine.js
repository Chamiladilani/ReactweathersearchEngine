import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const cities = ["Lisbon", "Paris", "Sydney", "San Francisco", "Tokyo"];

const SearchEngine = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57821c3b75b60c68ecd1a8d0dd1aa8d3`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderWeatherIcon = (iconCode) => {
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    return <img src={iconUrl} alt="Weather Icon" />;
  };

  return (
    <div className="search-engine">
      <div className="search-bar">
        <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={() => handleSearch(query)}>Search</button>
      </div>
      <div className="weather-cards">
        {cities.map((city) => (
          <div className="weather-card" key={city}>
            <h2>{city}</h2>
            {weatherData && weatherData.name === city ? (
              <>
                <div className="city-info">
                  <p>{weatherData.weather[0].description}</p>
                </div>
                <div className="weather-info">
                  {renderWeatherIcon(weatherData.weather[0].icon)}
                  <p>
                    Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
                  </p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEngine;
