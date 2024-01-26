"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { UnarchiveProject } from "../../../public/CommonFunctions";
import { useRouter } from "next/navigation";

export default function Project({
  projectId,
  projectName,
  tasks,
  boards,
  archived,
  allTags,
  allProjects,
}) {
  const router = useRouter();
  const groupedTasks = groupTasks(boards, tasks);

  const unarchiveHandler = async () => {
    (await UnarchiveProject(projectId)) && router.refresh();
  };

  useEffect(() => {
    document.title = projectName + " - Todo";
    localStorage.setItem("lastPage", `project/${projectId}`);
  }, []);

  return (
    <>
      <div className={styles.view_header} id="viewHeader">
        <div className={styles.view_header_content}>
          <h1>{projectName}</h1>
          {!archived && (
            <div>
              <Icon type="view" />
            </div>
          )}
        </div>
      </div>

      {archived && (
        <div className={`${styles.list_box} ${styles.archived_project} `} id="listBox">
          <p>This project is archived</p>
          <button onClick={unarchiveHandler}>Unarchive</button>
        </div>
      )}

      {!archived &&
        (boards.length === 0 && tasks.length === 0 ? (
          <NoTask
            page="project"
            allTags={allTags}
            allProjects={allProjects}
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
                  allTags={allTags}
                  allProjects={allProjects}
                  fromProject={{
                    projectId: projectId,
                    projectName: projectName,
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
