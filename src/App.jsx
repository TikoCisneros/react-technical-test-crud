import { useState } from "react";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import { Button } from "@chakra-ui/react";

function App() {
  const [showList, setShowList] = useState(true);

  const showListHandler =  () => setShowList((prevState) => !prevState);

  return (
    <div>
      <Button onClick={showListHandler}>
        {showList ? 'Add task' : 'Back to list'}
      </Button>
      {showList ? <Tasks /> : <AddTask  onSuccess={showListHandler} />}
    </div>
  )

}

export default App;
