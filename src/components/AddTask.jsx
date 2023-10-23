import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { v4 as genUUID } from 'uuid';

// eslint-disable-next-line react/prop-types
export const AddTask = ({ onSuccess }) => {
  const [task, setTask] = useState('');
  const [{ data, loading, error }, executePost] = useAxios(
    {
      url: 'http://localhost:8100/tasks',
      method: 'POST',
    },
    { manual: true }
  );

  useEffect(() => {
    !!data && onSuccess?.();
  }, [data])

  if (loading) return <p>Sending data to server..</p>;
  if (error) return <p>Error adding task!</p>;

  const handleSave = (event) => {
    event.preventDefault();
    executePost({
      data: {
        id: genUUID(),
        name: task,
        done: false
      },
    })
  }

  return (<div>
    <input type='text' value={task} onChange={({ target: { value } }) => setTask(value)} />
    <button onClick={handleSave}>Save</button>
  </div>);
};
