import styles from "../../../styles/scss/newTaskCard.module.scss";

export default function NewTaskCard({ closeCardHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover" onClick={closeCardHandler}>
      <div
        className={styles.new_task_container}
        onClick={containerClickHandler}
      >
        <div>Task name and description</div>
        <div>Options</div>
        <div>divider</div>
        <button onClick={closeCardHandler}>buttons</button>
      </div>
    </div>
  );
}
