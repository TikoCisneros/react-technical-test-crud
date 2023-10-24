import { Flex } from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { Task } from "./Task";

export const Tasks = () => {
  const [{ data, loading, error }, refresh] = useAxios({
    url: 'http://localhost:8100/tasks',
    method: 'GET'
  }, { useCache: false });

  if (loading) return <p>Loading tasks..</p>;
  if (error) return <p>Error loading tasks!</p>;

  return (
    <Flex flexDirection="column" gap="2">
      {data.map((task) => (
        <Task key={task.id} task={task} onOperationDone={refresh}/>
      ))}
    </Flex>
  );
}
