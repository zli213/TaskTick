"use client";

import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";
import styles from "../../../styles/scss/application.module.scss";

export default function Inbox(props) {
  document.title = "Inbox - Todo";

  useEffect(() => {
    localStorage.setItem("lastPage", "inbox");
  }, []);

  const inBoxTasks = props.data.filter((task) => {
    return task.projectId == "";
  });

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>Inbox</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={inBoxTasks} />
      </div>
    </>
  );
}
