"use client";

import TodoList from "../../application/widgets/TodoList";

export default function Project(props) {
  localStorage.setItem("lastPage", `project/${props.projectId}`);

  const tasks = props.data.filter((task) => {
    return task.projectId == "632a3c5e8f8c9b987f441c3a";   //net to edit
  })

  return (
    <>
      <h1>Project name {props.projectId}</h1>
      <div className="list-box">
        <TodoList tasks={tasks} />
      </div>
    </>
  );
}
