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
import Icon from "../../../application/widgets/Icon";

export default function TaskHeaderLeft({
  projectId,
  projectName,
  board,
  showInbox,
  reverse,
}) {
  return (
    <div className={styles.task_header_title}>
      {!projectId && showInbox  ? (
        <Link href="application/inbox">
          <Icon type="hashtag_small" />
          &nbsp; Inbox
        </Link>
      ) : (
        <Link href={`/application/project/${projectId}`}>
         {projectName && !reverse && <Icon type="hashtag_small" />} 
          &nbsp;{projectName}
        </Link>
      )}
      {board && (
        <>
          &nbsp;/&nbsp;
          <Link href={`/application/project/${projectId}`}>{board}</Link>
        </>
      )}
       {projectName && reverse && <Icon type="hashtag_small" />} 
    </div>
  );
}
