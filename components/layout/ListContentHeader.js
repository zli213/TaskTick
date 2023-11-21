import styles from '../../styles/layout/listContentHeader.module.scss';

export function ListContentHeader({title}) {
  return (
    <header className={styles.view_header}>
      <div className={styles.view_header_content}>
        <h1>
          <span>{title}</span>
          <small>10.05</small>
        </h1>
        <div>
          <button className={styles.check_button}>
            <div>icon</div>
            <span>check</span>
          </button>
        </div>
      </div>
    </header>
  );
}
