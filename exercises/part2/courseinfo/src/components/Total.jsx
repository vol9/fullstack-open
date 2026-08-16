export default function Total({ parts }) {
  // console.log(exercises);

  return (
    <p style={{ fontWeight: "bold", fontSize: "larger" }}>
      total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
    </p>
  );
}
