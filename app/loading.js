import Rolling from "../public/icon/rolling.svg";
import styles from "../styles/scss/app.module.scss";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={styles.loading}>
      <img src="/icon/rolling.gif" alt="task not found" />
    </div>
  );
}
