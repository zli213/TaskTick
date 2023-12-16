"use client";

import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";

export default function Inbox(props) {
  useEffect(() => {
    localStorage.setItem("lastPage", "inbox");
  }, []);

  const inBoxTasks = props.data.filter((task) => {
    return task.projectId == "";
  });

  return (
    <div className="">
      <h1>Inbox</h1>
      <div className="list-box">
        <TodoList tasks={inBoxTasks} />
      </div>
    </div>
  );
}
