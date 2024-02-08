"use client";

import TodoList from "../../application/widgets/TodoList";
import { useState, useEffect, use } from "react";
import styles from "../../../styles/scss/application.module.scss";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { useSelector, useDispatch } from "react-redux";
import PopupMenu, { useMenu } from "../../application/widgets/PopupMenu";
import { switchInboxCompletedTasks } from "../../../store/viewOptions";
import { toast } from "react-toastify";
import { addToastId } from "../../../store/toastIds";

export default function Inbox(props) {
  const dispatch = useDispatch();
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  let tasks = Object.values(useSelector((state) => state.tasks));
  let completedTasks = Object.values(
    useSelector((state) => state.completedTasks.inbox)
  );
  const toastIds = useSelector((state) => state.toastIds.toastIds);

  completedTasks =
    completedTasks !== undefined ? Object.values(completedTasks) : [];

  let showCompletedTask = useSelector(
    (state) => state.viewOptions.inbox.showCompletedTasks
  );
  console.log("1", tasks);
  console.log("2", completedTasks);

  const showCompletedHandler = (event) => {
    dispatch(switchInboxCompletedTasks(showCompletedTask));
  };

  useEffect(() => {
    document.title = "Inbox - Todo";
    localStorage.setItem("lastPage", "inbox");
  }, []);

  // Check the latest task has been completed
  const inBoxTasks = tasks.filter((task) => {
    return task.projectId == "" || task.projectId == null;
  });
  console.log("4", inBoxTasks);
  useEffect(() => {
    console.log("length:", completedTasks.length);
    if (completedTasks.length !== 0) {
      console.log("5");
      // Check the latest completedTasks's updatedAt
      const latestCompletedTaskISO =
        completedTasks[completedTasks.length - 1].updatedAt;
      const latestCompletedTaskTime = new Date(
        latestCompletedTaskISO
      ).getTime();
      // 转换为新西兰时间
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
          <h1>Inbox</h1>
          <div className={styles.menu_btn_container}>
            <button
              onClick={swithMenuHandler}
              className={styles.btn_completed_task}
            >
              <Icon type="view" />
              View
            </button>
            {showItemMenu && (
              <PopupMenu
                onOverlayClick={swithMenuHandler}
                position={buttonPosition}
                levels=""
              >
                <div className={styles.task_item_action_menu}>
                  <div className={styles.view_btn}>
                    <Icon type="check_circle" />
                    <label htmlFor="showCompletedTask">
                      <div>Completed tasks</div>
                      <div className={styles.toggle_switch}>
                        <input
                          type="checkbox"
                          id="showCompletedTask"
                          className={styles.view_checkbox}
                          onChange={showCompletedHandler}
                          checked={showCompletedTask}
                        ></input>
                        <span className={styles.toggle_background}></span>
                      </div>
                    </label>
                  </div>
                </div>
              </PopupMenu>
            )}
          </div>
        </div>
      </div>
      {tasks.length == 0 &&
      !showCompletedTask &&
      completedTasks.length !== 0 ? (
        <NoTask page="inbox" />
      ) : (
        <div className={styles.list_box}>
          <TodoList tasks={inBoxTasks} />
          {showCompletedTask && (
            <TodoList tasks={completedTasks} isCompleted={true} />
          )}
        </div>
      )}
    </>
  );
}
