/**
 * Description: the left part of header of Task page.
 *
 * Each project name should link to the specific project page.
 * If a task don't belong to a project, it belongs to Inbox
 *
 * Param:
 *  - projectId
 *  - projectName
 *  - board
 */

import styles from "../../../../styles/scss/task.module.scss";
import Link from "next/link";

export default function TaskHeaderLeft({ projectId, projectName, board }) {
  const str = " / ";

  return (
    <div className={styles.taskHeadr_title}>
      {!projectId ? (
        <Link href="application/inbox"># Inbox</Link>
      ) : (
        <Link href={`/application/project/${projectId}`}># {projectName}</Link>
      )}
      {board && (
        <>
          {str}
          <Link href={`/application/project/${projectId}`}>board</Link>
        </>
      )}
    </div>
  );
}
