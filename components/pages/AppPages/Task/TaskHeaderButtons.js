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
import Icon from "../../../application/widgets/Icon";

export default function TaskHeaderButton() {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <div className={styles.task_header_button}>
      <button>
        <Icon type="up_arrow" />
      </button>
      <button>
        <Icon type="down_arrow" />
      </button>
      <button onClick={onDismiss}>
        <Icon type="close" />
      </button>
    </div>
  );
}
