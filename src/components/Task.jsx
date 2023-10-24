import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, Icon, Text } from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { useEffect, useMemo } from "react";

// eslint-disable-next-line react/prop-types
export const Task = ({ task: { id, name, done }, onOperationDone }) => {
  const taskUrl = useMemo(() => `http://localhost:8100/tasks/${id}`, [id]);

  const [{ data: isUpdated, loading: loadUpdate, error: errorUpdate }, executePut] = useAxios(
    {
      url: taskUrl,
      method: 'PUT',
    },
    { manual: true }
  );

  const [{ data: isDeleted, loading: loadDelete, error: errorDelete }, executeDelete] = useAxios(
    {
      url: taskUrl,
      method: 'DELETE',
    },
    { manual: true }
  );

  useEffect(() => {
    (!!isUpdated || !!isDeleted) && onOperationDone?.();
  }, [isUpdated, isDeleted])

  if (loadUpdate || loadDelete) return <p>Sending data to server..</p>;
  if (errorUpdate || errorDelete) return <p>Error updating task!</p>;
  

  const doneHandler = () => {
    executePut({
      data: {
        id,
        name,
        done: !done
      }
    })
  }

  const deleteHandler = (event) => {
    event.stopPropagation();
    executeDelete({
      data: {
        id,
        name,
        done,
      }
    })
  }

  return (
    <Card>
      <CardBody onClick={doneHandler}>
        <Text as={done ? 's' : undefined}>{name}</Text>
        <Icon as={DeleteIcon} onClick={deleteHandler} />
      </CardBody>
    </Card>
  )
}
