"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect } from "react";
import TodoList from "../../application/widgets/TodoList";
import Link from "next/link";
import NoTask from "../../application/widgets/NoTask";
import { useSelector } from "react-redux";
import useCompletedTaskNotification from "../../application/widgets/useCompletedTaskNotification";
import useDismissToast from "../../application/widgets/useDismissToast";

function LabelPage({ label }) {
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = tasks.filter((task) => {
    return task.tags.includes(label);
  });

  useEffect(() => {
    document.title = "Filters & Labels - Todo";
    localStorage.setItem("lastPage", `label/${label}`);
  }, []);

  // Show the latest completed task notification
  useCompletedTaskNotification();
  // Dismiss the previous task notification
  useDismissToast();

  return (
    <>
      <div className={styles.back_to_filter}>
        <Link href="/application/filters-labels" id="action_menu_btn">Filters & Labels</Link>/
      </div>
      <div className={styles.view_header} id="view_header">
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>{label}</h1>
        </div>
      </div>
      {tasks.length === 0 && <NoTask page="label" />}
      {tasks.length !== 0 && (
        <div className={styles.list_box} id="list_box">
          <TodoList tasks={tasks} fromTag={label} />
        </div>
      )}
    </>
  );
}

export default LabelPage;
