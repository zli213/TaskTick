import { ListContentHeader } from "../../layout/ListContentHeader";
import TodoList from "../../layout/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

function Today() {
  //fetch today's job

  return (
    <>
      <ListContentHeader title={"Today"} />
      <TodoList datas={DUMMY_TASKS} />
    </>
  );
}

export default Today;
