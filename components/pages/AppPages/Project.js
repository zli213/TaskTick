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
import PopupMenu, { useMenu } from "../../application/widgets/PopupMenu";
import { switchProjectCompletedTasks } from "../../../store/viewOptions";

export default function Project({ projectId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();

  let showCompletedTask = useSelector(
    (state) => state.viewOptions.projects[projectId]
  );
  showCompletedTask =
    showCompletedTask !== undefined
      ? showCompletedTask.showCompletedTasks
      : false;

  const projects = useSelector((state) => state.projects);
  const project = projects[projectId];
  if (project.state === "deleted") {
    router.push("/application/inbox");
  }

  const boards = project.boards !== undefined ? project.boards : [];
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = tasks.filter((task) => task.projectId === projectId);

  const groupedTasks = groupTasks(boards, tasks);

  let completedTasks = useSelector((state) => state.completedTasks[projectId]);
  completedTasks =
    completedTasks !== undefined ? Object.values(completedTasks) : [];
  const groupedCompletedTasks = groupTasks(boards, completedTasks);

  const unarchiveHandler = async () => {
    (await UnarchiveProject(projectId)) &&
      dispatch(unarchiveProjectAction(projectId));
  };

  const showCompletedHandler = (event) => {
    dispatch(switchProjectCompletedTasks(projectId));
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
            <div className={styles.menu_btn_container}>
              <button
                onClick={swithMenuHandler}
                className={styles.btn_completed_task}
              >
                <Icon type="view" />
                View
              </button>
              {showItemMenu && (
                <PopupMenu
                  onOverlayClick={swithMenuHandler}
                  position={buttonPosition}
                  levels=""
                >
                  <div className={styles.task_item_action_menu}>
                    <div className={styles.view_btn}>
                      <Icon type="check_circle" />
                      <label htmlFor="showCompletedTask">
                        <div>Completed tasks</div>
                        <div className={styles.toggle_switch}>
                          <input
                            type="checkbox"
                            id="showCompletedTask"
                            className={styles.view_checkbox}
                            onChange={showCompletedHandler}
                            checked={showCompletedTask}
                          ></input>
                          <span className={styles.toggle_background}></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </PopupMenu>
              )}
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
        (boards.length === 0 && tasks.length === 0 && !showCompletedTask ? (
          <NoTask
            page="project"
            fromProject={{ projectId: projectId, projectName: project.name }}
            fromBoard={""}
          />
        ) : (
          <div className={styles.list_box}>
            {groupedTasks.map((group, index) => (
              <React.Fragment key={index}>
                <TodoList
                  id={index + group.name}
                  key={group.name}
                  title={group.name}
                  tasks={group.tasks}
                  fromProject={{
                    projectId: projectId,
                    projectName: project.name,
                  }}
                  fromBoard={group.name}
                />
                {showCompletedTask && (
                  <TodoList
                    key={index}
                    tasks={groupedCompletedTasks[index].tasks}
                    isCompleted={true}
                  />
                )}
              </React.Fragment>
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
