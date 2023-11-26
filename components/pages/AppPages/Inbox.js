import TodoList from "../../application/widgets/TodoList";

import { DUMMY_TASKS } from "../../../public/dummy-data";

export default function Inbox() {
  //fetch tasks without program

  return (
    <>
      <h1>Inbox</h1>
      <div className="list-box">
        <TodoList datas={DUMMY_TASKS} />
      </div>
    </>
  );
}
