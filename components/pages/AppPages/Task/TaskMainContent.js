/**
 * Description: Contain title and description of a task
 *
 */

import styles from "../../../../styles/scss/task.module.scss";
import CheckBoxButton from "../../../application/widgets/CheckBoxButton";

export default function TaskMainContent({
  taskId,
  taskTitle,
  taskDescription,
  taskCompleted,
  taskPriority,
}) {
  return (
    <div className={styles.task_main_container} id="task_main_container0">
      <div className={styles.task_main_sub_container}>
        <div>
          <div className={styles.task_main_task}>
            <CheckBoxButton
              priority={taskPriority}
              taskId={taskId}
              completed={taskCompleted}
            />
            <div className={styles.task_overview_main}>
              <div className={styles.task_overview_title}>{taskTitle}</div>
              <div className={styles.task_overview_description}>
                {taskDescription ? taskDescription : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
