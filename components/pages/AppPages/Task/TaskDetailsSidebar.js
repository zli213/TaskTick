/**
 * Description: Include details of a task
 */
"use client";

import { useState } from "react";
import styles from "../../../../styles/scss/task.module.scss";
import TaskHeaderLeft from "./TaskHeaderLeft";
import Scheduler, {
  convertDate,
  formatDate,
} from "../../../application/widgets/Scheduler";
import Icon from "../../../application/widgets/Icon";
import Link from "next/link";
import PopupMenu, { useMenu } from "../../../application/widgets/PopupMenu";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../../../store/tasks";
import { useSelector } from "react-redux";

export default function TaskDetailsSidebar({ showInbox, taskId }) {
  let task = useSelector((state) => state.tasks[taskId]);
  const dispatch = useDispatch();
  const dateJson = task.dueDate ? formatDate(task.dueDate) : "";

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);

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

  return (
    <div className={styles.task_sidebar}>
      <div className={styles.task_sidebar_list}>
        <div className={styles.task_sidebar_item}>
          <h4>Project</h4>
          <TaskHeaderLeft
            projectId={task.projectId}
            projectName={task.projectName}
            board={task.board}
            showInbox={showInbox}
          />
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
          <button className={styles.task_sidebar_button}>
            <div className={styles.flexStart}>
              <Icon type="flag" />
            </div>
            <span>{task.priority}</span>
          </button>
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
