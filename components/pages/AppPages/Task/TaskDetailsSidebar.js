/**
 * Description: Include details of a task
 */
"use client";

import { useState } from "react";
import styles from "../../../../styles/scss/task.module.scss";
import Scheduler, {
  convertDate,
  formatDate,
} from "../../../application/widgets/Scheduler";
import PriorityPicker from "../../../application/widgets/PriorityPicker";
import ProjectSelector from "../../../application/widgets/taskEditor/ProjectSelector";
import Icon from "../../../application/widgets/Icon";
import Link from "next/link";
import PopupMenu, { useMenu } from "../../../application/widgets/PopupMenu";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../../../store/tasks";
import { useSelector } from "react-redux";

export default function TaskDetailsSidebar({task, taskId }) {
  let task2 = useSelector((state) => state.tasks[taskId]);
  if (task2) {task = task2; }
  let allProjects = Object.values(useSelector((state) => state.projects));
  allProjects = allProjects
    .filter((project) => project.archived !== true)
    .filter((project) => project.isDeleted !== true);

  const dispatch = useDispatch();

  console.log('11',task, task.dueDate)
  const dateJson = task.dueDate ? formatDate(task.dueDate) : "";
  console.log('33',dateJson)

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [selectedPriority, setSelectedPriority] = useState(() => {
    return task.priority.charAt(task.priority.length - 1) - "0";
  });

  //Update task
  const projSelectHandler = async (projId, projName, board) => {
    console.log('44',dateJson.dateStr)
    const newTask = {
      ...task,
      projectId: projId,
      projectName: projName,
      board: board,
      selectedDate: dateJson == '' ? null : dateJson.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
    };
    console.log('111',newTask)

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
    swichProjectHandler();
  };

  const changeSelectedDate = async (date) => {
    setSelectedDate(date.dateStr);

    const newTask = {
      ...task,
      selectedDate: date.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
    };

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
  };

  const changeSelectedPriority = async (priority) => {
    setSelectedPriority(priority);

    const newTask = {
      ...task,
      selectedDate: dateJson.dateStr,
      priority: priority,
    };

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
  };

  // Show/Hide Scheduler
  const {
    showItemMenu: showSchedulerMenu,
    buttonPosition: schedulerPosition,
    swithMenuHandler: swichSchedulerHandler,
  } = useMenu();

  // Show/Hide Scheduler2
  const {
    showItemMenu: showSecSchedulerMenu,
    buttonPosition: secSchedulerPosition,
    swithMenuHandler: switchSecSchedulerHandler,
  } = useMenu();

  // Show/Hide PriorityPicker
  const {
    showItemMenu: showPriorityMenu,
    buttonPosition: priorityPosition,
    swithMenuHandler: swichPriorityHandler,
  } = useMenu();

  // Show/Hide ProjectSelector
  const {
    showItemMenu: showProjectMenu,
    buttonPosition: projectPosition,
    swithMenuHandler: swichProjectHandler,
  } = useMenu();

  return (
    <div className={styles.task_sidebar}>
      <div className={styles.task_sidebar_list}>
        <div className={styles.task_sidebar_item}>
          <h4>Project</h4>
          <div className={styles.btn_menu}>
            <span onClick={swichProjectHandler}>
              {!task.projectId ? (
                <div className={styles.task_sidebar_button}>
                  <Icon type="hashtag_small" />
                  Inbox
                </div>
              ) : (
                <div className={`${styles.tag_box2} ${styles.task_sidebar_button}`}>
                  <span className={`${styles.tag_box3} ${styles.flexStart}`}>
                    <Icon type="hashtag_small" />
                  </span>

                  <span
                    className={styles.tag_box2}
                    style={{ display: "block" }}
                  >
                    {task.projectName}
                  </span>
                  {task.board && (
                    <>
                      /<span className={styles.tag_box3}>{task.board}</span>
                    </>
                  )}
                </div>
              )}
            </span>
            {showProjectMenu && (
              <PopupMenu
                onOverlayClick={swichProjectHandler}
                position={projectPosition}
                levels={
                  boardNum(allProjects) <= 9
                    ? boardNum(allProjects) * 0.87
                    : 8.22
                }
                menuWidth="250"
              >
                <ProjectSelector
                  allProjects={allProjects}
                  onProjSelect={projSelectHandler}
                  onOverlayClick={swichProjectHandler}
                />
              </PopupMenu>
            )}
          </div>
        </div>
        <hr />
        <div className={styles.task_sidebar_item}>
          {!selectedDate && (
            <>
              <h4
                className={`${styles.task_sidebar_label_title}`}
                onClick={switchSecSchedulerHandler}
                style={{ cursor: "pointer" }}
              >
                <span>Due date</span>
                <Icon type="add" />
              </h4>
              <span
                className={styles.btn_menu}
                style={{ position: "absolute" }}
              >
                {showSecSchedulerMenu && (
                  <PopupMenu
                    onOverlayClick={switchSecSchedulerHandler}
                    position={secSchedulerPosition}
                    levels={9.67}
                    menuWidth="230"
                  >
                    <Scheduler
                      data={{ selectedDate: dateJson.dateStr }}
                      onChangeDate={(dateJson) => {
                        switchSecSchedulerHandler();
                        changeSelectedDate(dateJson);
                      }}
                    />
                  </PopupMenu>
                )}
              </span>
            </>
          )}
          {selectedDate && (
            <>
              <h4>Due date</h4>
              <span className={styles.btn_menu}>
                <button
                  className={styles.task_sidebar_button}
                  onClick={swichSchedulerHandler}
                >
                  <div className={styles.flexStart}>
                    <Icon type="calender" />
                  </div>
                  <span>{convertDate(dateJson.dateStr)}</span>
                </button>
                {showSchedulerMenu && (
                  <PopupMenu
                    onOverlayClick={swichSchedulerHandler}
                    position={schedulerPosition}
                    levels={9.67}
                    menuWidth="230"
                  >
                    <Scheduler
                      data={{ selectedDate: dateJson.dateStr }}
                      onChangeDate={(dateJson) => {
                        changeSelectedDate(dateJson);
                        swichSchedulerHandler();
                      }}
                    />
                  </PopupMenu>
                )}
              </span>
            </>
          )}
        </div>
        <hr />

        <div className={styles.task_sidebar_item}>
          <h4>Priority</h4>
          <div className={styles.btn_menu}>
            <button
              className={styles.task_sidebar_button}
              onClick={swichPriorityHandler}
            >
              <div className={styles.flexStart}>
                <Icon
                  type={selectedPriority == 4 ? "flag" : "flag_filled_small"}
                  className={priorityColor(selectedPriority)}
                />
              </div>
              <span>P{selectedPriority}</span>
            </button>
            {showPriorityMenu && (
              <PopupMenu
                onOverlayClick={swichPriorityHandler}
                position={priorityPosition}
                levels={4}
                menuWidth="110"
              >
                <PriorityPicker
                  onPrioritySelect={(pri) => {
                    changeSelectedPriority(pri);
                    swichPriorityHandler();
                  }}
                  onOverlayClick={swichPriorityHandler}
                />
              </PopupMenu>
            )}
          </div>
        </div>
        <hr />
        <div className={styles.task_sidebar_item}>
          <div className={styles.task_sidebar_label_title}>
            <h4>Labels</h4>
            <span>
              <Icon type="add" />
            </span>
          </div>
          <div className={styles.task_tags_container}>
            {task.tags &&
              task.tags.map((tag, index) => (
                <Link href={`/application/label/${tag}`} key={tag}>
                  <span className={styles.task_tag_item} key={index}>
                    <span className={styles.tag_box}>{tag} </span>
                    <Icon type="close_small" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

const boardNum = (allProjects) => {
  if (allProjects.length === 0) return 1;

  let num = 0;
  allProjects.forEach((proj) => {
    num += proj.boards.length + 1;
  });
  return num + 2;
};

const priorityColor = (p) => {
  switch (p) {
    case 1:
      return styles.button_red;
    case 2:
      return styles.button_yellow;
    case 3:
      return styles.button_blue;
  }
};
