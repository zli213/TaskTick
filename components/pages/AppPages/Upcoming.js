"use client";

import React from "react";
import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../application/widgets/Scheduler";
import useCompletedTaskNotification from "../../application/widgets/useCompletedTaskNotification";
import useDismissToast from "../../application/widgets/useDismissToast";

function Upcoming() {
  const dispatch = useDispatch();
  let tasks = Object.values(useSelector((state) => state.tasks));

  //use timestamp to compare if the item dueDate is today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureTasks = [];
  for (let i = 0; i < 8; i++) {
    futureTasks[i] = [];
    tasks.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);
      const todayPlusI = new Date(today);
      todayPlusI.setDate(today.getDate() + i);
      if (taskDueDate.getTime() === todayPlusI.getTime()) {
        futureTasks[i].push(task);
      }
    });
  }


  useEffect(() => {
    document.title = "Upcoming - TaskTick";
    localStorage.setItem("lastPage", "upcoming");
  }, []);

  // Show the latest completed task notification
  useCompletedTaskNotification();
  // Dismiss the previous task notification
  useDismissToast();

  return (
    <>
      <div className={styles.view_header} id="view_header5">
        <div className={styles.view_header_content}>
          <h1>Next 7 days</h1>
        </div>
      </div>
      <div className={styles.list_box} id="list_box5">
        {futureTasks.map((futureTask, index) => {
          let todayPlusI = new Date(today);
          todayPlusI.setDate(today.getDate() + index);
          return (
            <TodoList
              key={index}
              showProject={true}
              tasks={futureTask}
              title={
                index === 0
                  ? "Today"
                  : index === 1
                  ? "Tomorrow"
                  : `In ${index} days`
              }
              fromDate={formatDate(todayPlusI).dateStr}
              titleClassName={`${
                futureTask.length == 0 && styles.no_task_list
              }`}
              forbidEdit={true}
            />
          );
        })}
      </div>
    </>
  );
}

export default Upcoming;
