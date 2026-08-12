const Weather = ({ country, weather }) => {
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p> Temperature: {weather.main.temp} °C</p>
      <p>Humidity: {weather.main.humidity} %</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        width="175"
        height="175"
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
