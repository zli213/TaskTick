"use client";

import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";
import styles from "../../../styles/scss/application.module.scss";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { useSelector } from "react-redux";

export default function Inbox(props) {
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = tasks.filter((task) => task.completed !== true);

  useEffect(() => {
    document.title = "Inbox - Todo";
    localStorage.setItem("lastPage", "inbox");
  }, []);

  const inBoxTasks = tasks.filter((task) => {
    return task.projectId == "" || task.projectId == null;
  });

  return (
    <>
      <div className={styles.view_header}>
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>Inbox</h1>
          <div>
            <Icon type="view" />
          </div>
        </div>
      </div>
      {tasks.length == 0 ? (
        <NoTask page="inbox" />
      ) : (
        <div className={styles.list_box}>
          <TodoList tasks={inBoxTasks} />
        </div>
      )}
    </>
  );
}
