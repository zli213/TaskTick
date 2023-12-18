"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import AddTask from "../../application/widgets/AddTask";
import { useEffect } from "react";
import styles from "../../../styles/scss/application.module.scss";


function Today(props) {
  const router = useRouter();

  // localStorage.setItem("lastPage", "today");
  useEffect(() => {
    localStorage.setItem("lastPage", "today");

    if ("settingMenu" in props) {
      router.push(`/application/setting/${props.settingMenu}`);
    }
  }, [props.settingMenu]);


  //use timestamp to compare if the item dueDate is today
  const todayTasks = props.data.filter((task) => {
    return task.dueDate.getTime() == new Date().getTime();
  });

  useEffect(() => {
    localStorage.setItem("lastPage", "today");

    if ("settingMenu" in props) {
      router.push(`/application/setting/${props.settingMenu}`);
    }

    if ("taskId" in props) {
      router.push(`/application/task/${props.taskId}`);
    }
  }, []);

  return (
    <>
      <header className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>Today</h1>
          <div>buttons</div>
        </div>
      </header>
      <div className={styles.list_box}>
        <AddTask />
        <TodoList tasks={todayTasks} />
      </div>
    </>
  );
}

export default Today;
