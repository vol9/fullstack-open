import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Contact from "./services/utils";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    Contact.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personAlreadyExists = persons.find(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim(),
    );

    if (personAlreadyExists) {
      const userConfirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (userConfirm) {
        const updatedPerson = {
          ...personAlreadyExists,
          number: newNumber,
        };
        Contact.update(personAlreadyExists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === personAlreadyExists.id ? returnedPerson : person,
              ),
            );
            setNotification({
              text: `added new number for ${newName}`,
              type: "success",
            });
            setTimeout(() => {
              setNotification(null);
            }, 3500);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotification({
              text: `Information of ${personAlreadyExists.name} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setNotification(null);
            }, 3500);
            setPersons(
              persons.filter((person) => person.id !== personAlreadyExists.id),
            );
          });
      }
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    Contact.create(newPerson).then((returnedData) => {
      setNotification({
        text: `added ${newName}`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3500);
      setPersons(persons.concat(returnedData));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  const handleDelete = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      Contact.erase(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={notification} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>add a new </h3>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
