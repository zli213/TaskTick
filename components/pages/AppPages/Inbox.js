import { ListContentHeader } from "../../layout/ListContentHeader";
import TodoList from "../../layout/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

export default function Inbox() {
  //fetch tasks without program


  return (
    <>
      <ListContentHeader title="Inbox" />
      <div className="list-box">
        <TodoList datas={DUMMY_TASKS} />
      </div>
    </>
  );
}
