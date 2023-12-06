/**
 * Description: Include details of a task
 */

import styles from "../../../../styles/scss/task.module.scss";
import Link from "next/link";
import TaskHeaderLeft from "./TaskHeaderLeft";

export default function TaskDetailsSidebar({ task }) {
  return (
    <div className={styles.task_sidebar}>
      <div className={styles.task_sidebar_list}>
        <div>
          <div>Project</div>
          <TaskHeaderLeft
            projectId={task.projectId}
            projectName={task.projectName}
            board={task.board}
          />
        </div>
        <hr />
        <div>
          <div>Due date</div>
          <div>{task.dueDate.getDate().toString()}</div>
        </div>
        <hr />
        <div>
          <div>Priority</div>
          <div>{task.priority}</div>
        </div>
        <hr />
        <div>
          <div>
            <span>Labels</span>
            <span>+</span>
          </div>
          <div>{task.tags && task.tags.map((tag) => <span>{tag}</span>)}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}
