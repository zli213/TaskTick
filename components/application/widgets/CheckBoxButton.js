/**
 * Check box component
 * Automatically color the check button based on the priority of the task
 *
 * @param
 * priority
 *
 * @usage
 * <CheckBoxButton priority={priority} />
 */

"use client";
import React from "react";
import styles from "../../../styles/scss/singleItem.module.scss";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { completeTaskAction } from "../../../store/tasks";

const CheckBoxButton = ({ priority, taskId, dueDate, projectId }) => {
  const dispatch = useDispatch();
  const getPriorityColor = (option) => {
    switch (option) {
      case "P1":
        return styles.task_priority1;
      case "P2":
        return styles.task_priority2;
      case "P3":
        return styles.task_priority3;
      default:
        break;
    }
  };

  const clickHandler = async () => {
    try {
      const res = await fetch("/api/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskId),
      });

      const result = await res.json();
      console.log(result);
      result.ifComplete &&
        dispatch(completeTaskAction({ taskId, dueDate, projectId }));
    } catch (error) {
      throw error;
    }
  };

  return (
    <button
      className={`${styles.task_checkBox} ${getPriorityColor(priority)}`}
      onClick={clickHandler}
    >
      <span className={styles.task_checkBox_backgroud}></span>
      <Icon type="check" />
      <span className={styles.task_checkBox_circle}></span>
    </button>
  );
};

export default CheckBoxButton;
