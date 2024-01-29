"use client";

import React from "react";
import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Upcoming() {
  let tasks = useSelector((state) => state.tasks.tasks);
  tasks = tasks.filter((task) => task.completed !== true);

  useEffect(() => {
    document.title = "Upcoming - Todo";
    localStorage.setItem("lastPage", "upcoming");
  }, []);

  return (
    <>
      <div className={styles.view_header} id="viewHeader">
        <div className={styles.view_header_content}>
          <h1>Upcoming</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box} id='listBox'>
        <TodoList tasks={tasks} />
      </div>
    </>
  );
}

export default Upcoming;
