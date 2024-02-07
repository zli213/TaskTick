"use client";

import TodoList from "../../application/widgets/TodoList";
import { useState, useEffect } from "react";
import styles from "../../../styles/scss/application.module.scss";
import NoTask from "../../application/widgets/NoTask";
import Icon from "../../application/widgets/Icon";
import { useSelector, useDispatch } from "react-redux";
import PopupMenu, { useMenu } from "../../application/widgets/PopupMenu";
import { switchInboxCompletedTasks } from "../../../store/viewOptions";
import { toast } from "react-toastify";

export default function Inbox(props) {
  const dispatch = useDispatch();
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  let tasks = Object.values(useSelector((state) => state.tasks));
  let completedTasks = Object.values(
    useSelector((state) => state.completedTasks.inbox)
  );
  const [previousTasks, setPreviousTasks] = useState(tasks);
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

  // Check the latest completedTasks's updatedAt
  const latestCompletedTaskISO =
    completedTasks[completedTasks.length - 1].updatedAt;
  const latestCompletedTaskTime = new Date(latestCompletedTaskISO).getTime();
  // Current UTC time
  const currentTime = new Date().getTime();
  // 如果现在时间与最后一个完成的任务的时间相差在10s内，发送通知
  if (currentTime - latestCompletedTaskTime <= 10000) {
    toast.success("You have completed a task!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

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
