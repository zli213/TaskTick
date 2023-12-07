/**
 * Description: Contain title and description of a task
 *
 */

import styles from "../../../../styles/scss/task.module.scss";
import Link from "next/link";
import Uncheck from "../../../../public/icon/uncheck_grey_button.svg";

export default function TaskMainContent({
  taskId,
  taskTitle,
  taskDescription,
  taskCompleted,
}) {
  return (
    <div className={styles.task_main_container}>
      <div className={styles.task_main_sub_container}>
        <div>
          <div className={styles.task_main_task}>
            <button>
              <Uncheck />
            </button>
            <div className={styles.task_overview_main}>
              <div className={styles.task_overview_title}>{taskTitle}</div>
              <div className={styles.task_overview_description}>
                {taskDescription ? taskDescription : "Description" }
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
