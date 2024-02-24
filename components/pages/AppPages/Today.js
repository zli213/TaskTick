"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "/styles/scss/application.module.scss";
import Icon from "../../../components/application/widgets/Icon";
import NoTask from "../../application/widgets/NoTask";
import { useSelector, useDispatch } from "react-redux";
import useCompletedTaskNotification from "../../application/widgets/useCompletedTaskNotification";
import useDismissToast from "../../application/widgets/useDismissToast";

function Today(props) {
  const dispatch = useDispatch();
  let tasks = Object.values(useSelector((state) => state.tasks));

  const todayNum = useSelector((state) => state.num.todayNum);
  const router = useRouter();

  //use timestamp to compare if the item dueDate is today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overDueTasks = tasks
    .filter((task) => {
      return task.dueDate !== null;
    })
    .filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate.getTime() < today.getTime();
    });

  const todayTasks = tasks.filter((task) => {
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

  // Show the latest completed task notification
  useCompletedTaskNotification();
  // Dismiss the previous task notification
  useDismissToast();
  return (
    <>
      <div className={styles.view_header} id="viewHeader">
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <div className={styles.today_title}>
            <h1>Today</h1>
            {todayNum === 0 ? (
              ""
            ) : (
              <div className={styles.today_task_label} id="task_label">
                <Icon type="check_small" />
                {todayNum} tasks
              </div>
            )}
          </div>
        </div>
      </div>
      {todayNum === 0 ? (
        <NoTask page="today" fromDate={today} />
      ) : (
        <div className={styles.list_box} id="listBox">
          {overDueTasks.length !== 0 && (
            <TodoList
              tasks={overDueTasks}
              showProject={true}
              title="Overdue"
              forbidEdit={true}
            />
          )}
          <TodoList
            tasks={todayTasks}
            showProject={true}
            title="Today"
            fromDate={today}
            forbidEdit={true}
          />
        </div>
      )}
    </>
  );
}

export default Today;
