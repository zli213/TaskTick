"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";

export default function Project({ projectId, projectName, tasks, boards }) {
  const groupedTasks = {};
  !boards ? boards : boards.forEach((boardName) => {
    if (!groupedTasks[boardName]) {
      groupedTasks[boardName] = [];
    }
  });
  tasks.forEach((task) => {
    const boardName = task.board;
    if (!groupedTasks[boardName]) {
      groupedTasks[boardName] = [];
    }
    groupedTasks[boardName].push(task);
  });

  useEffect(() => {
    document.title = projectName + " - Todo";
    localStorage.setItem("lastPage", `project/${projectId}`);
  }, []);

  const noTasks = (
    <>
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
          <h1>{projectName}</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={groupedTasks[undefined]} />
        {boards
          ? Object.keys(groupedTasks)
              .filter((boardName) => boardName != "undefined")
              .map((boardName) => (
                <TodoList
                  key={boardName}
                  title={boardName}
                  tasks={groupedTasks[boardName]}
                />
              ))
          : ""}
        {tasks[0] == null ? noTasks : ""}
      </div>
    </>
  );
}
