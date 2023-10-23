import useAxios from 'axios-hooks';

function App() {
  const [{ data, loading, error }] = useAxios('http://localhost:8100/tasks');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default App;
