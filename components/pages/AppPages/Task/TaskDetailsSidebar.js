/**
 * Description: Include details of a task
 */
"use client";

import { useState } from "react";
import styles from "../../../../styles/scss/task.module.scss";
import TaskHeaderLeft from "./TaskHeaderLeft";
import {
  convertDate,
  formatDate,
} from "../../../application/widgets/Scheduler";
import Scheduler from "../../../application/widgets/Scheduler";
import Icon from "../../../application/widgets/Icon";

export default function TaskDetailsSidebar({ task }) {
  const dateJson = formatDate(task.dueDate);

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
  };

  // Show/Hide Scheduler
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const showScheduler = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      width: 0,
      top: buttonRect.bottom,
      left: buttonRect.left,
      bottom: buttonRect.top,
      right: buttonRect.right,
    });
    setIsShowScheduler(true);
  };


  const hideScheduler = () => {
    setIsShowScheduler(false);
  };

  return (
    <div className={styles.task_sidebar}>
      <div className={styles.task_sidebar_list}>
        <div className={styles.task_sidebar_item}>
          <h4>Project</h4>
          <TaskHeaderLeft
            projectId={task.projectId}
            projectName={task.projectName}
            board={task.board}
          />
        </div>
        <hr />
        <div className={styles.task_sidebar_item}>
          <h4>Due date</h4>
          <button
            className={styles.task_sidebar_button}
            onClick={showScheduler}
          >
            <div className={styles.flexStart}>
              <Icon type="calender" />
            </div>
            <span>{convertDate(selectedDate)}</span>
          </button>
          {isShowScheduler && (
            <Scheduler
              position={buttonPosition}
              data={{ selectedDate: selectedDate }}
              onChangeDate={(dateJson) => {
                changeSelectedDate(dateJson);
                hideScheduler();
              }}
              onOverlayClick={hideScheduler}
            />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M466-466H252v-28h214v-214h28v214h214v28H494v214h-28v-214Z" />
              </svg>
            </span>
          </div>
          <div className={styles.task_tags_container}>
            {task.tags &&
              task.tags.map((tag, index) => (
                <span className={styles.task_tag_item} key={index}>
                  <span>{tag} </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill="gray"
                  >
                    <path d="m324.154-301.077-23.077-23.077L455.923-480 301.077-634.846l23.077-23.077L480-503.077l154.846-154.846 23.077 23.077L503.077-480l154.846 155.846-23.077 23.077L480-455.923 324.154-301.077Z" />
                  </svg>
                </span>
              ))}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
