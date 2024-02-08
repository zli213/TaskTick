"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "/styles/scss/application.module.scss";
import Icon from "../../../components/application/widgets/Icon";
import NoTask from "../../application/widgets/NoTask";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToastId } from "../../../store/toastIds";

function Today(props) {
  const dispatch = useDispatch();
  let tasks = Object.values(useSelector((state) => state.tasks));
  console.log("tasks:", tasks);
  let completedTasks = Object.values(
    useSelector((state) => state.completedTasks)
  );
  console.log("completedTasks:", completedTasks);
  const completedTasksArray = completedTasks
    .map((taskGroup) => Object.values(taskGroup))
    .flat();
  console.log("completedTasksArray:", completedTasksArray);
  const todayNum = useSelector((state) => state.num.todayNum);
  const router = useRouter();

  //use timestamp to compare if the item dueDate is today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Filter out the tasks that have been completed today
  const todayCompletedTasks = completedTasksArray.filter((task) => {
    const completedAt = new Date(task.updatedAt);
    return completedAt >= todayStart && completedAt <= todayEnd;
  });

  console.log("todayCompletedTasks:", todayCompletedTasks);
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
  console.log("todayTasks:", todayTasks);
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

  useEffect(() => {
    if (todayCompletedTasks.length !== 0) {
      // 找出todayCompletedTasks里updatedAt最大的
      // 假设 todayCompletedTasks 是一个包含已完成任务的数组
      const latestCompletedTask = todayCompletedTasks.reduce((latest, task) => {
        // 将任务的updatedAt转换为Date对象
        const currentTaskDate = new Date(task.updatedAt);

        // 如果latest还未定义或当前任务日期更晚，则更新latest
        if (!latest || currentTaskDate > new Date(latest.updatedAt)) {
          return task;
        }

        return latest;
      }, null); // 初始化reduce函数的accumulator为null

      // 输出找到的最新完成的任务
      console.log(latestCompletedTask);

      const latestCompletedTaskISO = latestCompletedTask.updatedAt;

      const latestCompletedTaskTime = new Date(
        latestCompletedTaskISO
      ).getTime();
      const localDate = new Date(latestCompletedTaskTime).toLocaleString(
        "en-NZ",
        { timeZone: "Pacific/Auckland" }
      );
      // Current UTC time
      const currentTime = new Date().getTime();
      const currentLocalTime = new Date(currentTime).toLocaleString("en-NZ", {
        timeZone: "Pacific/Auckland",
      });
      console.log("latestCompletedTaskTime:", latestCompletedTaskTime);
      console.log("currentTime:", currentLocalTime);
      console.log("localDate:", localDate);
      // If the latest task has been completed within 1 second, show the toast
      if (currentTime - latestCompletedTaskTime <= 1000) {
        console.log("6");
        const newToastId = toast.success(
          <Notification
            onUndo={() => {
              // TODO: Add undo function after completed task can be converted back to uncompleted
            }}
          />,
          {
            pauseOnHover: false,
          }
        );
        dispatch(addToastId(newToastId));
      }
    }
  }, [completedTasks]);
  //----------------- Notification ----------------
  const Notification = ({ onUndo, closeToast }) => {
    const handleClick = () => {
      onUndo();
      closeToast();
    };
    return (
      <div className={styles.notification}>
        You have completed a task!
        <button onClick={handleClick} className={styles.undoBtn}>
          Undo
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.view_header}>
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <div>
            <h1>Today</h1>
            {todayNum === 0 ? (
              ""
            ) : (
              <div className={styles.today_task_label}>
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
        <div className={styles.list_box}>
          {overDueTasks.length !== 0 && (
            <TodoList tasks={overDueTasks} showProject={true} title="Overdue" />
          )}
          <TodoList
            tasks={todayTasks}
            showProject={true}
            title="Today"
            fromDate={today}
          />
        </div>
      )}
    </>
  );
}

export default Today;
