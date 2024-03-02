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
import React, { useState, useEffect, use } from "react";
import styles from "../../../styles/scss/singleItem.module.scss";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTaskAction,
  undoCompleteTaskAction,
} from "../../../store/tasks";

const CheckBoxButton = ({ priority, taskId, completed }) => {
  const task = useSelector((state) => state.tasks[taskId]);
  if (task) {
    priority = task.priority;
  }

  const [isCompleted, setIsCompleted] = useState(completed);
  const dispatch = useDispatch();
  // const toastIds = useSelector((state) => state.toastIds.toastIds);
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
    console.log("click");
    const apiOption = isCompleted
      ? "/api/undoCompleteTask"
      : "/api/completeTask";
    const actionToDispatch = isCompleted
      ? undoCompleteTaskAction
      : completeTaskAction;
    const requestBody = JSON.stringify(taskId);
    try {
      const res = await fetch(apiOption, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      const result = await res.json();
      if (result) {
        dispatch(actionToDispatch(taskId));
        setIsCompleted(!isCompleted);
      } else {
        throw new Error("Operation failed without error message.");
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    console.log("completed status:", isCompleted);
  }, [isCompleted]);

  return (
    <button
      className={`${styles.task_checkBox} ${getPriorityColor(priority)} `}
      onClick={clickHandler}
      // disabled={completed}
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
