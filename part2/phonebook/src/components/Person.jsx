const Person = ({ name, number, onClick }) => {
  return (
    <div>
      <p>
        {name} {number} <button onClick={onClick}>delete</button>
      </p>
    </div>
  );
};

export default Person;
