"use client";

import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";
import styles from "../../../styles/scss/application.module.scss";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";

export default function Inbox(props) {
  useEffect(() => {
    document.title = "Inbox - Todo";
    localStorage.setItem("lastPage", "inbox");
  }, []);

  const inBoxTasks = props.data.filter((task) => {
    return task.projectId == "";
  });

  return (
    <>
      <div className={styles.view_header} id="viewHeader">
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>Inbox</h1>
          <div><Icon type="view"/></div>
        </div>
      </div>
      {props.data.length == 0 ? (
        <NoTask page="inbox" />
      ) : (
        <div className={styles.list_box} id="listBox">
          <TodoList tasks={inBoxTasks} />
        </div>
      )}
    </>
  );
}
