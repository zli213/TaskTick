"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { createRef, useEffect, useRef } from "react";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";

export default function Project({
  projectId,
  projectName,
  tasks,
  boards,
  allTags,
  allProjects,
}) {
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

  const todoListRef = useRef(Object.keys(groupedTasks).map(() => createRef()));
  const cancelAllEditorsInPage = () => {
    todoListRef.current.forEach((todolist) => {
      todolist.current.cancelAllEditorInTodolist();
    });
  };

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
        <NoTask
          page="project"
          allTags={allTags}
          allProjects={allProjects}
          fromProject={{ projectId: projectId, projectName: projectName }}
          fromBoard={""}
        />
      ) : (
        <div className={styles.list_box}>
          todolist
          <TodoList
            tasks={groupedTasks[undefined]}
            allTags={allTags}
            allProjects={allProjects}
            fromProject={{ projectId: projectId, projectName: projectName }}
            fromBoard={""}
            onRef={todoListRef.current[0]}
            cancelAllEditorsInPage={cancelAllEditorsInPage}
          />
          {boards
            ? Object.keys(groupedTasks)
                .filter((boardName) => boardName != "undefined")
                .map((boardName, i) => (
                  <TodoList
                    key={boardName}
                    title={boardName}
                    tasks={groupedTasks[boardName]}
                    allTags={allTags}
                    allProjects={allProjects}
                    fromProject={{
                      projectId: projectId,
                      projectName: projectName,
                    }}
                    fromBoard={boardName}
                    onRef={todoListRef.current[i + 1]}
                    cancelAllEditorsInPage={cancelAllEditorsInPage}
                  />
                ))
            : ""}
        </div>
      )}
    </>
  );
}
