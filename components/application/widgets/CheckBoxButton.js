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

import React from "react";
import styles from "../../../styles/scss/singleItem.module.scss";
import Icon from "./Icon";

const CheckBoxButton = ({priority}) => {
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

  return (
    <button className={`${styles.task_checkBox} ${getPriorityColor(priority)}`}>
      <span className={styles.task_checkBox_backgroud}></span>
      <Icon type="check" />
      <span className={styles.task_checkBox_circle}></span>
    </button>
  );
};

export default CheckBoxButton;
