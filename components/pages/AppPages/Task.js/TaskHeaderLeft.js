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
import HashtagSm from "../../../../public/icon/hashtag_small.svg";

export default function TaskHeaderLeft({ projectId, projectName, board }) {
  return (
    <div className={styles.taskHeadr_title}>
      {!projectId ? (
        <Link href="application/inbox">
          <HashtagSm />&nbsp; Inbox
        </Link>
      ) : (
        <Link href={`/application/project/${projectId}`}><HashtagSm />&nbsp;{projectName}</Link>
      )}
      {board && (
        <>
          &nbsp;/&nbsp;
          <Link href={`/application/project/${projectId}`}>{board}</Link>
        </>
      )}
    </div>
  );
}
