"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect, useState } from "react";
import Icon from "../../application/widgets/Icon";
import TodoList from "../../application/widgets/TodoList";
import Link from "next/link";
import NoTask from "../../application/widgets/NoTask";
import { useSelector } from "react-redux";

function LabelPage({ label }) {
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = tasks.filter((task) => {
    return task.tags.includes(label);
  });

  useEffect(() => {
    document.title = "Filters & Labels - Todo";
    localStorage.setItem("lastPage", `label/${label}`);
  }, []);

  return (
    <>
      <div className={styles.back_to_filter}>
        <Link href="/application/filters-labels">Filters & Labels</Link>/
      </div>
      <div className={styles.view_header}>
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>{label}</h1>
        </div>
      </div>
      {tasks.length === 0 && <NoTask page="label" />}
      {tasks.length !== 0 && (
        <div className={styles.list_box}>
          <TodoList tasks={tasks} fromTag={label} />
        </div>
      )}
    </>
  );
}

export default LabelPage;
