import TodoList from "../../application/widgets/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

function Upcoming() {
  return (
    <>
      <h1>Upcoming</h1>
      <TodoList datas={DUMMY_TASKS} />;
    </>
  );
}

export default Upcoming;
