import { ListContentHeader } from "../../layout/ListContentHeader";
import TodoList from "../TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

function Today() {
  return (
    <>
      <ListContentHeader title={"Today"} />
      <TodoList datas={DUMMY_TASKS} />
    </>
  );
}

export default Today;
