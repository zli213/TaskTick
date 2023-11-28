import TodoList from "../../application/widgets/TodoList";

import { DUMMY_TASKS } from "../../../public/dummy-data";

export default function Project({ projectId }) {
  // fetch/filter relative tasks

  return (
    <>
      <h1>Project name {projectId}</h1>
      <div className="list-box">
        <TodoList datas={DUMMY_TASKS} />
      </div>
    </>
  );
}
