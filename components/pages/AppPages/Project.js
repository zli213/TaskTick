"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { UnarchiveProject } from "../../../public/CommonFunctions";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { unarchiveProjectAction } from "../../../store/projects";

export default function Project({ projectId }) {
  const dispacth = useDispatch();
  const router = useRouter();
  const projects = useSelector((state) => state.projects);
  const project = projects[projectId];
  const showCompletedTask = useSelector(
    (state) => state.viewOptions.inbox.showCompletedTasks
  );

  if (project.state === "deleted") {
    router.push("/application/inbox");
  }

  const boards = project.boards !== undefined ? project.boards : [];
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = tasks
    .filter((task) => task.projectId === projectId)
 
  const groupedTasks = groupTasks(boards, tasks);

  const completedTasks = Object.values(useSelector((state) => state.completedTasks[projectId]));
  const groupedCompletedTasks = groupTasks(boards, completedTasks);

console.log('1',groupedTasks)
console.log('2',groupedCompletedTasks)

  const unarchiveHandler = async () => {
    (await UnarchiveProject(projectId)) &&
      dispacth(unarchiveProjectAction(projectId));
  };

  useEffect(() => {
    document.title = project.name + " - Todo";
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
            fromProject={{ projectId: projectId, projectName: project.name }}
            fromBoard={""}
          />
        ) : (
          <div className={styles.list_box}>
            {groupedTasks.map((group) => (
              <TodoList
                key={group.name}
                title={group.name}
                tasks={group.tasks}
                fromProject={{
                  projectId: projectId,
                  projectName: project.name,
                }}
                fromBoard={group.name}
              />
            ))}
          </div>
        ))}
    </>
  );
}

const groupTasks = (boards, tasks) => {
  const tasksGroup = [];
  tasksGroup[0] = { name: "", tasks: [] };

  boards.forEach((board, index) => {
    tasksGroup[index + 1] = { name: board, tasks: [] };
  });

  if (boards.length > 0) {
    tasks.forEach((task) => {
      const boardName = task.board;
      tasksGroup.forEach((group, index) => {
        if (group.name === boardName) {
          tasksGroup[index].tasks.push(task);
        }
      });
    });
  } else {
    tasks.forEach((task) => {
      tasksGroup[0].tasks.push(task);
    });
  }

  return tasksGroup;
};
