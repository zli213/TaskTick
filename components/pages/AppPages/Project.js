"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { UnarchiveProject } from "../../../public/CommonFunctions";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Project({
  projectId,
}) {
  const router = useRouter();
  const projects = useSelector((state) => state.tasks.projects);
  const project = projects.find((project) => project.projectId === projectId);
  const boards = project.boards;
  let tasks = useSelector((state) => state.tasks.tasks);
  tasks = tasks.filter((task) => task.projectId === projectId);


  const groupedTasks = groupTasks(boards, tasks);

  const unarchiveHandler = async () => {
    (await UnarchiveProject(projectId)) && router.refresh();
  };

  useEffect(() => {
    document.title = project.projectName + " - Todo";
    localStorage.setItem("lastPage", `project/${projectId}`);
  }, []);

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>{project.name}</h1>
          {!project.archived && (
            <div>
              <Icon type="view" />
            </div>
          )}
        </div>
      </div>

      {project.archived && (
        <div className={`${styles.list_box} ${styles.archived_project} `}>
          <p>This project is archived</p>
          <button onClick={unarchiveHandler}>Unarchive</button>
        </div>
      )}

      {!project.archived &&
        (boards.length === 0 && tasks.length === 0 ? (
          <NoTask
            page="project"
            fromProject={{ projectId: projectId, projectName: projectName }}
            fromBoard={""}
          />
        ) : (
          <div className={styles.list_box}>
            {Object.keys(groupedTasks)
              .filter((boardName) => boardName !== "undefined")
              .map((boardName) => (
                <TodoList
                  key={boardName}
                  title={boardName}
                  tasks={groupedTasks[boardName]}
                  fromProject={{
                    projectId: projectId,
                    projectName: project.name,
                  }}
                  fromBoard={boardName}
                />
              ))}
          </div>
        ))}
    </>
  );
}

const groupTasks = (boards, tasks) => {
  const tasksGroup = {};
  tasksGroup[""] = [];

  if (boards.length > 0) {
    tasks.forEach((task) => {
      const boardName = task.board;
      if (!tasksGroup[boardName]) {
        tasksGroup[boardName] = [];
      }
      tasksGroup[boardName].push(task);
    });
  } else {
    tasks.forEach((task) => {
      tasksGroup[""].push(task);
    });
  }
  return tasksGroup;
};
