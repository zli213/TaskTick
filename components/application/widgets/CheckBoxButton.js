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

const CheckBoxButton = ({
  priority,
  taskId,
  dueDate,
  projectId,
  completed,
}) => {
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
    if (completed) return;
    try {
      const res = await fetch("/api/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskId),
      });

      const result = await res.json();
      result.ifComplete && dispatch(completeTaskAction(taskId));
    } catch (error) {
      throw error;
    }
  };

  return (
    <button
      className={`${styles.task_checkBox} ${getPriorityColor(priority)} `}
      onClick={clickHandler}
      disabled={completed}
    >
      <span
        className={`${styles.task_checkBox_backgroud} ${
          completed && styles.completed_background
        } `}
      ></span>
      <Icon
        type="check"
        className={` ${completed && styles.completed_svg} `}
      />
      <span
        className={`${styles.task_checkBox_circle} ${
          completed && styles.completed_circle
        }`}
      ></span>
    </button>
  );
};

export default CheckBoxButton;
