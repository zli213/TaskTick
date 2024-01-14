"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "/styles/scss/application.module.scss";
import Icon from "/components/application/widgets/Icon";

function Today(props) {
  const router = useRouter();

  //use timestamp to compare if the item dueDate is today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overDueTasks = props.data.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    return taskDueDate.getTime() < today.getTime();
  });

  const todayTasks = props.data.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    return taskDueDate.getTime() === today.getTime();
  });

  useEffect(() => {
    document.title = "Today - Todo";
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
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <div>
            <h1>Today</h1>
            {props.num && (
              <div className={styles.today_task_label}>
                <Icon type="check_small" />
                {props.num} tasks
              </div>
            )}
          </div>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={overDueTasks} title="Overdue" />
        <TodoList tasks={todayTasks} title="Today" />
      </div>
    </>
  );
}

export default Today;
