import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseValue = (setFunc) => () => {
    setFunc((prev) => prev + 1);
  };

  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={increaseValue(setGood)} text="good" />
      <Button onClick={increaseValue(setNeutral)} text="neutral" />
      <Button onClick={increaseValue(setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const SubHeader = ({ title }) => {
  return <h2>{title}</h2>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, title }) => {
  const total = good + neutral + bad;
  const average = Number(
    ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2),
  );
  const percentageGood = Number(((good / total) * 100).toFixed(2));

  if (total === 0) {
    return (
      <div>
        <SubHeader title="statistics" />
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <SubHeader title="statistics" />
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={percentageGood + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
