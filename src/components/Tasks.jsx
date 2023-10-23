import useAxios from "axios-hooks";

export const Tasks = () => {
  const [{ data, loading, error }] = useAxios({
    url: 'http://localhost:8100/tasks',
    method: 'GET'
  }, { useCache: false });

  if (loading) return <p>Loading tasks..</p>;
  if (error) return <p>Error loading tasks!</p>;

  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}
