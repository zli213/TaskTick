/**
 * Description: the left part of header of Task page.
 *
 * Each project name should link to the specific project page.
 * If a task don't belong to a project, it belongs to Inbox
 *
 * Param:
 *  - projectId
 *  - projectName
 *  - boardcenter
 */
"use client";

import styles from "../../../../styles/scss/task.module.scss";
import Link from "next/link";
import Icon from "../../../application/widgets/Icon";
import { useSelector } from "react-redux";

export default function TaskHeaderLeft({
  taskId,
  projectId,
  projectName,
  board,
  showInbox,
  reverse,
}) {
  let task = useSelector((state) => state.tasks[taskId]);
  if (task) {
    projectId =  task.projectId
    projectName = task.projectName;
    board = task.board;
  }

  return (
    <div className={styles.task_header_title}>
      {!projectId && showInbox ? (
        <Link href="application/inbox">
          <Icon type="hashtag_small" />
          &nbsp; Inbox
        </Link>
      ) : (
        <Link
          href={`/application/project/${projectId}`}
          className={styles.tag_box2}
        >
          {projectName && !reverse && (
            <span className={styles.tag_box3}>
              <Icon type="hashtag_small" />
            </span>
          )}
          &nbsp;<span className={styles.tag_box2} style={{display: 'block'}} id="tag0">{projectName}</span>
          {board && (
            <>
              &nbsp;/&nbsp;
              <span className={styles.tag_box3} id="tag1">{board}</span>
            </>
          )}
        </Link>
      )}

      {projectName && reverse && <Icon type="hashtag_small"  className={styles.tag_box3} id="tag2"/>}
    </div>
  );
}
