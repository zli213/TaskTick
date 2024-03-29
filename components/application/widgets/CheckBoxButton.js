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
import React, { useState, useEffect } from "react";
import styles from "../../../styles/scss/singleItem.module.scss";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { completeTaskAction } from "../../../store/tasks";

const CheckBoxButton = ({ priority, taskId, completed }) => {
  const task = useSelector((state) => state.tasks[taskId]);
  if (task) {
    priority = task.priority;
  }

  const [isCompleted, setIsCompleted] = useState(completed);
  const dispatch = useDispatch();
  const toastIds = useSelector((state) => state.toastIds.toastIds);
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
    if (isCompleted) return;
    try {
      const res = await fetch("/api/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskId),
      });

      const result = await res.json();
      if (result.ifComplete) {
        dispatch(completeTaskAction(taskId));
        setIsCompleted(result.ifComplete);
      } else {
        throw new Error("Complete task failed ");
      }
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
          isCompleted && styles.completed_background
        } `}
      ></span>
      <Icon
        type="check"
        className={` ${isCompleted && styles.completed_svg} `}
      />
      <span
        className={`${styles.task_checkBox_circle} ${
          isCompleted && styles.completed_circle
        }`}
      ></span>
    </button>
  );
};

export default CheckBoxButton;
