/**
 * Description: the Buttons of header on Task page.
 *
 * Param:
 *  - projectId
 *  - projectName
 *  - board
 */

"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/task.module.scss";
import CloseButton from "../../../../public/icon/close.svg";
import UpArrow from "../../../../public/icon/up_arrow.svg";
import DownArrow from "../../../../public/icon/down_arrow.svg";

export default function TaskHeaderButton() {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <div className={styles.task_header_button}>
      <button><UpArrow /></button>
      <button><DownArrow /></button>
      <button onClick={onDismiss}>
        <CloseButton />
      </button>
    </div>
  );
}
