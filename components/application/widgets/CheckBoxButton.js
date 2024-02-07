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
import { addToastId } from "../../../store/toastIds";
import { toast } from "react-toastify";
import Link from "next/link";

const CheckBoxButton = ({
  priority,
  taskId,
  dueDate,
  projectId,
  completed,
}) => {
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
    // const newToastId = toast.info(
    //   <Notification
    //     onUndo={() => {
    //       clearTimeout(timer);
    //     }}
    //   />,
    //   { pauseOnHover: false, autoClose: false }
    // );
    // dispatch(addToastId(newToastId));
    // const timer = setTimeout(async () => {
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
    // }, 2000);
  };
  //----------------- Notification ----------------
  // const Notification = ({ onUndo, closeToast, date }) => {
  //   const handleClick = () => {
  //     onUndo();
  //     closeToast();
  //   };
  //   return (
  //     <div className={styles.notification}>
  //       1 task completed
  //       <button onClick={handleClick} className={styles.undoBtn}>
  //         Undo
  //       </button>
  //     </div>
  //   );
  // };
  // useEffect(() => {
  //   return () => {
  //     if (toastIds.length !== 0) {
  //       const latestToastId = toastIds[toastIds.length - 1];
  //       toast.dismiss(latestToastId);
  //     }
  //   };
  // }, [toastIds]);

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
