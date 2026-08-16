export default function Filter({ value, onChange }) {
  //   console.log(value, onChange);

  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
}
