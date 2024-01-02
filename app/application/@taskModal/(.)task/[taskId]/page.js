/***
 * Description: Modal Page for single tasks
 *
 * Author: Ryan
 */

import { notFound } from "next/navigation";
import Modal from "../../../../../components/application/widgets/Modal";
import getOneTask from "../../../../../src/utils/data/getOneTask";
import styles from "../../../../../styles/scss/task.module.scss";
import TaskHeaderLeft from "../../../../../components/pages/AppPages/Task/TaskHeaderLeft";
import TaskMainContent from "../../../../../components/pages/AppPages/Task/TaskMainContent";
import TaskDetailsSidebar from "../../../../../components/pages/AppPages/Task/TaskDetailsSidebar";
import TaskHeaderButtons from "../../../../../components/pages/AppPages/Task/TaskHeaderButtons";

export default async function TaskModal({ params }) {
  try {
    //get single task
    const task = await getOneTask(params.taskId);

    return (
      <Modal >
        <div className={styles.task_modal_container}>
          <header className={styles.task_header}>
            <div className={styles.task_title_bar}>
              <TaskHeaderLeft
                projectId={task.projectId}
                projectName={task.projectName}
                board={task.board}
              />
              <TaskHeaderButtons />
            </div>
          </header>
          <div id="task-container" className={styles.task_container}>
            <TaskMainContent
              taskId={task._id}
              taskTitle={task.title}
              taskDescription={task.description}
              taskCompleted={task.completed}
            />
            <TaskDetailsSidebar task={task} />
          </div>
        </div>
      </Modal>
    );
  } catch (error) {
    notFound();
  }
}
