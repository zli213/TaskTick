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
import Link from "next/link";

export default function TaskDetailsSidebar({ task, showInbox }) {
  const dateJson = task.dueDate ? formatDate(task.dueDate) : "";
  const hasDue = task.dueDate == null ? false : true;

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
            showInbox={showInbox}
          />
        </div>
        <hr />
        <div className={styles.task_sidebar_item}>
          <h4>Due date</h4>
          {hasDue && (
            <button
              className={styles.task_sidebar_button}
              onClick={showScheduler}
            >
              <div className={styles.flexStart}>
                <Icon type="calender" />
              </div>
              <span>{convertDate(selectedDate)}</span>
            </button>
          )}
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
              <Icon type="add" />
            </span>
          </div>
          <div className={styles.task_tags_container}>
            {task.tags &&
              task.tags.map((tag, index) => (
                <Link href={`/application/label/${tag}`}>
                  <span className={styles.task_tag_item} key={index}>
                    <span>{tag} </span>
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
