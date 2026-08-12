import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() =>
    Array.from({ length: anecdotes.length }, () => 0),
  );

  const handleClick = () => {
    let randNum;
    do {
      randNum = Math.floor(Math.random() * anecdotes.length);
    } while (randNum === selected);
    setSelected(randNum);
  };

  const handleVote = (index) => {
    const copy = [...votes];
    copy[index] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <Header title="Anecdote of the day" />
      {anecdotes[selected]}
      <div style={{ display: "flex" }}>
        <Button onClick={() => handleVote(selected)} text="vote" />
        <Button onClick={handleClick} text="next anecdote" />
      </div>
      <MostVoted
        votes={votes}
        anecdotes={anecdotes}
        title="Anecdote with most votes"
      />
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={{ display: "block" }}>
      {text}
    </button>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const MostVoted = ({ title, votes, anecdotes }) => {
  const max = Math.max(...votes);
  const index = votes.indexOf(max);

  if (max === 0) {
    return (
      <div>
        <h2>{title}</h2>
        <p>No votes yet</p>
      </div>
    );
  }
  return (
    <div>
      <h2>{title}</h2>
      <p>
        {anecdotes[index]} <br /> Has {max} votes
      </p>
    </div>
  );
};

export default App;
