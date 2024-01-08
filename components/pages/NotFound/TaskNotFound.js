/**
 * 404 page for Task not found
 */

import Link from "next/link";
import styles from "../../../styles/scss/notFound.module.scss";

export default function TaskNotFound() {
  return (
    <>
      <div className={`${styles.info_content}  ${styles.big_padding}`}>
        <img src="/images/task_not_found.jpg" alt="task not found" />
        <h1>Task not found</h1>
        <p className={styles.limit_width}>
          The task doesn't seem to exist or you don't have permission to access
          it.
        </p>
        <div>
          <button>
            <Link href="/application/today">Go back to Home</Link>
          </button>
        </div>
        <p className={styles.limit_width}>
          You're currently logged in as 1234@gmail.com. Wrong account? Please
          log out and back into an account with access.
        </p>
      </div>
    </>
  );
}
