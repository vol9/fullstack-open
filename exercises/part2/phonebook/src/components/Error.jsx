import "./index.css";

const Error = ({ message }) => {
  const successStyle = {
    color: "green",
    border: "solid green",
  };

  const errorStyle = {
    color: "red",
    border: "solid red",
  };

  if (message === null) {
    return null;
  }

  return (
    <div
      className="error"
      style={message.type === "success" ? successStyle : errorStyle}
    >
      {message.text}
    </div>
  );
};

export default Error;
