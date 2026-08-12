const Form = ({ onSubmit, country, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      find countries <input value={country} onChange={onChange} />
    </form>
  );
};

export default Form;
