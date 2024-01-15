"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";

export default function Project({ projectId, projectName, tasks, boards }) {
  const groupedTasks = {};
  !boards
    ? boards
    : boards.forEach((boardName) => {
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

  console.log(boards.length == 0 && tasks.length == 0);

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>{projectName}</h1>
          <div>
            <Icon type="view" />
          </div>
        </div>
      </div>

      {boards.length == 0 && tasks.length == 0 ? (
        <NoTask page="project" />
      ) : (
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
        </div>
      )}
    </>
  );
}
