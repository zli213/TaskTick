import "./NewTaskCard.scss";

export default function NewTaskCard({ closeHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="new_task_cover" onClick={closeHandler}>
      <div className="new_task_container" onClick={containerClickHandler}>
        <div>Task name and description</div>
        <div>Options</div>
        <div>divider</div>
        <button onClick={closeHandler}>buttons</button>
      </div>
    </div>
  );
}
