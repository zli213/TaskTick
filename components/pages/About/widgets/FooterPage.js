import styles from "../../../../styles/scss/home.module.scss";
import Link from "next/link";

export default function FooterPage() {
  return (
    <footer className={styles.foot_container}>
      <div className={styles.foot_inner_container}>
        <div className={styles.left_footer}>
          <div className={styles.title}>
            <img src="/images/logo.png" alt="logo" />
            TaskTick
          </div>
          <div className={styles.content}>
            Schedule your life with TaskTick.
          </div>
        </div>
        <div className={styles.right_footer}>
          <div className={styles.topic_container}>
            <h3>About</h3>
            <Link href="/about">About</Link>
          </div>
          <div className={styles.topic_container}>
            <h3>Follow us</h3>
            <Link href="https://github.com/zli213/TaskTick">Github</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
