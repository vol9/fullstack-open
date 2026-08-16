import Person from "./Person";

export default function Persons({ persons, handleDelete }) {
  return (
    <div>
      {persons.map((person) => (
        <Person
          name={person.name}
          number={person.number}
          onClick={() => handleDelete(person.id, person.name)}
          key={person.id}
        />
      ))}
    </div>
  );
}
