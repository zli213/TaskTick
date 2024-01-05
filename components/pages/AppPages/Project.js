"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React from "react";
import { useEffect } from "react";

export default function Project(props) {
  const tasks = props.data.filter((task) => {
    return task.projectId == props.projectId;
  });

  const projectName =
    tasks.length > 0 ? tasks[0].projectName : "Unknown Project";

  useEffect(() => {
    if (tasks.length > 0) {
      document.title = projectName + " - Todo";
      localStorage.setItem("lastPage", `project/${props.projectId}`);
    }
  }, [tasks, props.projectId]);

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>{projectName}</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={tasks} />
      </div>
    </>
  );
}
