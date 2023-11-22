import { ListContentHeader } from "../../layout/ListContentHeader";
import TodoList from "../../layout/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";

export default function Project({ projectId }) {
  // fetch/filter relative tasks

  return (
    <>
      <ListContentHeader title={projectId} />
      <div className="list-box">
        <TodoList datas={DUMMY_TASKS} />
      </div>
    </>
  );
}
