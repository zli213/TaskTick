"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React from "react";
import { useEffect } from "react";
import AddTask from "../../application/widgets/AddTask";

export default function Project(props) {
  const tasks = props.data.filter((task) => {
    return task.projectId == props.projectId;
  });

  useEffect(() => {
    document.title = props.projectName + " - Todo";
    localStorage.setItem("lastPage", `project/${props.projectId}`);
  }, []);

  const noTasks = (
    <>
      <AddTask />
      <div className={styles.no_tasks}>
        <img src="/images/startNewTask.jpg" />
        <h4>Start small (or dream big)...</h4>
        <div className={styles.no_tasks_content}>
          Track tasks, follow progress, and discuss details in one central,
          shared project.
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>{props.projectName}</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={tasks} />
        {tasks[0] == null ? noTasks : ""}
      </div>
    </>
  );
}
