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
import TaskTagCheckList from "../../../application/widgets/taskEditor/TaskTagCheckList";
import Icon from "../../../application/widgets/Icon";
import Link from "next/link";
import PopupMenu, { useMenu } from "../../../application/widgets/PopupMenu";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../../../store/tasks";
import { useSelector } from "react-redux";

export default function TaskDetailsSidebar({ task, taskId }) {
  let task2 = useSelector((state) => state.tasks[taskId]);
  let tagList = useSelector((state) => state.labels.tags);

  if (task2) {
    task = task2;
  }
  let allProjects = Object.values(useSelector((state) => state.projects));
  allProjects = allProjects
    .filter((project) => project.archived !== true)
    .filter((project) => project.isDeleted !== true);

  const dispatch = useDispatch();
  const dateJson = task.dueDate ? formatDate(task.dueDate) : "";

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [selectedPriority, setSelectedPriority] = useState(() => {
    return task.priority.charAt(task.priority.length - 1) - "0";
  });

  //Update task
  const projSelectHandler = async (projId, projName, board) => {
    const newTask = {
      ...task,
      projectId: projId,
      projectName: projName,
      board: board,
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
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
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
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

  const updateCheckTags = async (taglist) => {
    const newTask = {
      ...task,
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
      tags: taglist,
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

  const removeOneTag = async (tag) => {
    const newTagList = task.tags.filter((t) => t !== tag);

    const newTask = {
      ...task,
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
      tags: newTagList,
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

  // Show/Hide ProjectSelector
  const {
    showItemMenu: showProjectMenu,
    buttonPosition: projectPosition,
    swithMenuHandler: swichProjectHandler,
  } = useMenu();

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

  // Show/Hide TaskTagCheckList
  const {
    showItemMenu: showTagMenu,
    buttonPosition: tagPosition,
    swithMenuHandler: swichTagHandler,
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
                <div
                  className={`${styles.tag_box2} ${styles.task_sidebar_button}`}
                >
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
            {showProjectMenu && !task.completed && (
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
                className={`${styles.task_sidebar_label_title} ${styles.task_sidebar_button}`}
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
                {showSecSchedulerMenu && !task.completed && (
                  <PopupMenu
                    onOverlayClick={switchSecSchedulerHandler}
                    position={secSchedulerPosition}
                    levels={10.4}
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
              <h4 className={`${styles.task_sidebar_label_title}`}>Due date</h4>
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
                {showSchedulerMenu && !task.completed && (
                  <PopupMenu
                    onOverlayClick={swichSchedulerHandler}
                    position={schedulerPosition}
                    levels={10.4}
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
            {showPriorityMenu && !task.completed && (
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
          <div className={styles.btn_menu}>
            <div
              className={` ${styles.task_sidebar_button} ${styles.task_sidebar_label_title}`}
              onClick={swichTagHandler}
            >
              <h4>Labels</h4>
              <Icon type="add" />
            </div>
            {showTagMenu && !task.completed && (
              <PopupMenu
                onOverlayClick={swichTagHandler}
                position={tagPosition}
                levels={tagList.length <= 7 ? tagList.length * 0.75 : 5.4}
                menuWidth="250"
              >
                <TaskTagCheckList
                  allTags={tagList}
                  checkedTags={task.tags}
                  onTagCheckClick={(tags) => {
                    updateCheckTags(tags);
                  }}
                  onOverlayClick={swichTagHandler}
                />
              </PopupMenu>
            )}
          </div>
          <div className={styles.task_tags_container}>
            {task.tags &&
              task.tags.map((tag, index) => (
                <div key={tag}>
                  <span className={styles.task_tag_item} key={index}>
                    <Link
                      href={`/application/label/${tag}`}
                      className={styles.tag_box}
                    >
                      {tag}{" "}
                    </Link>
                    <div
                      className={styles.tag_remove}
                      onClick={() => {
                        removeOneTag(tag);
                      }}
                    >
                      <Icon type="close_small" />
                    </div>
                  </span>
                </div>
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
