/**
 * Description: Contain title and description of a task
 *
 */

import styles from "../../../../styles/scss/task.module.scss";
import checkboxStyles from "../../../../styles/scss/singleItem.module.scss";
import CheckBoxButton from "../../../application/widgets/CheckBoxButton";

export default function TaskMainContent({
  taskId,
  taskTitle,
  taskDescription,
  taskCompleted,
  taskPriority,
}) {
  return (
    <div className={styles.task_main_container}>
      <div className={styles.task_main_sub_container}>
        <div>
          <div className={styles.task_main_task}>
            <CheckBoxButton
              priority={taskPriority}
              taskId={taskId}
              completed={taskCompleted}
              styles={checkboxStyles}
            />
            <div className={styles.task_overview_main}>
              <div className={styles.task_overview_title}>{taskTitle}</div>
              <div className={styles.task_overview_description}>
                {taskDescription ? taskDescription : "Description"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.task_main_add_sub}>
            <button>add sub task</button>
          </div>
        </div>
      </div>
    </div>
  );
}
