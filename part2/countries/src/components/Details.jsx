import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Details = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);
  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        const weatherData = response.data;
        setWeather(weatherData);
        console.log(weatherData);
      });
  }, [country]);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} </p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}> {language} </li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width="175"
        height="175"
      />
      <Weather weather={weather} country={country} />
    </div>
  );
};

export default Details;
