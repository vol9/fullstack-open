import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Details from "./components/Details";
import Country from "./components/Country";

function App() {
  const [value, setValue] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const data = response.data;
        setValue(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const countryChange = (event) => {
    setUserInput(event.target.value);
    setShowCountry(null);
  };

  const countryToShow = value.filter((data) =>
    data.name.common.toLowerCase().includes(userInput.toLowerCase()),
  );

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  let content;

  if (showCountry) {
    content = (
      <div>
        <Country country={showCountry} />
        <Details country={showCountry} />
      </div>
    );
  } else if (!userInput || !userInput.trim()) {
    content = <p>look for a country</p>;
  } else if (countryToShow.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (countryToShow.length === 1) {
    content = (
      <div>
        <Country country={countryToShow[0]} />
        <Details country={countryToShow[0]} />
      </div>
    );
  } else {
    content = countryToShow.map((country) => (
      <Country
        country={country}
        onShow={() => handleShowCountry(country)}
        key={country.name.common}
      />
    ));
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        country={userInput}
        onChange={countryChange}
      />
      {content}
    </div>
  );
}

export default App;
