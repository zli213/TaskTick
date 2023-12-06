/**
 * Description: Contain title and description of a task
 *
 */

import styles from "../../../../styles/scss/task.module.scss";
import Link from "next/link";
import Uncheck from "../../../../public/icon/uncheck_grey_button.svg";

export default function TaskMainContent() {
  return (
    <div className={styles.task_main_container}>
      <div className={styles.task_main_sub_container}>
        <div>
          <div className={styles.task_main_task}>
            <button>
              <Uncheck />
            </button>
            <div className={styles.task_overview_main}>
              <div className={styles.task_overview_title}>Title</div>
              <div className={styles.task_overview_description}>
                获取description
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
