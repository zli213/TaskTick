import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToastId } from "../../../store/toastIds";
import styles from "../../../styles/scss/application.module.scss";

function useCompletedTaskNotification() {
  const dispatch = useDispatch();
  const completedTasks = useSelector((state) => state.completedTasks);
  const completedTasksArray = Object.values(completedTasks)
    .map((taskGroup) => Object.values(taskGroup))
    .flat();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Filter out the tasks that have been completed today
  const todayCompletedTasks = completedTasksArray.filter((task) => {
    const completedAt = new Date(task.updatedAt);
    return completedAt >= todayStart && completedAt <= todayEnd;
  });
  useEffect(() => {
    if (todayCompletedTasks.length !== 0) {
      const latestCompletedTask = todayCompletedTasks.reduce((latest, task) => {
        const currentTaskDate = new Date(task.updatedAt);
        if (!latest || currentTaskDate > new Date(latest.updatedAt)) {
          return task;
        }
        return latest;
      }, null);
      const latestCompletedTaskISO = latestCompletedTask.updatedAt;
      const latestCompletedTaskTime = new Date(
        latestCompletedTaskISO
      ).getTime();
      const currentTime = new Date().getTime();

      if (currentTime - latestCompletedTaskTime <= 1000) {
        const newToastId = toast.success(
          <Notification
            onUndo={() => {
              // TODO: Add undo function after completed task can be converted back to uncompleted
            }}
            task={latestCompletedTask}
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
  const Notification = ({ onUndo, closeToast, task }) => {
    const handleClick = () => {
      onUndo();
      closeToast();
    };
    return (
      <div className={styles.notification}>
        You have completed a task called [{task.title}]!
        <button onClick={handleClick} className={styles.undoBtn}>
          Undo
        </button>
      </div>
    );
  };
}

export default useCompletedTaskNotification;
