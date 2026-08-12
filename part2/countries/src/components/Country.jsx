const Country = ({ country, onShow }) => {
  return (
    <div>
      <h2>
        {country.name.common} <button onClick={onShow}>Show</button>
      </h2>
    </div>
  );
};

export default Country;
