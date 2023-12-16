"use client";

import TodoList from "../../application/widgets/TodoList";
import React from "react";

export default function Project(props) {
  localStorage.setItem("lastPage", `project/${props.projectId}`);

  const tasks = props.data.filter((task) => {
    return task.projectId == props.projectId;
  });

  const projectName = tasks[0].projectName;

  return (
    <div>
      <h1>{projectName}</h1>
      <div className="list-box">
        <TodoList tasks={tasks} />
      </div>
    </div>
  );
}
