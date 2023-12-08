"use client";

import TodoList from "../../application/widgets/TodoList";

export default function Inbox(props) {
  localStorage.setItem("lastPage", "inbox");

  const inBoxTasks = props.data.filter((task) => {
    return task.projectId == "";
  });

  return (
    <>
      <h1>Inbox</h1>
      <div className="list-box">
        <TodoList tasks={inBoxTasks} />
      </div>
    </>
  );
}
