import "./NewTaskCard.scss";

export default function SettingsCard({ subMenu, closeHandler  }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover grey_cover " onClick={closeHandler} >
      <div className="new_task_container" onClick={containerClickHandler}>
        <div>Settings</div>
        <div>{subMenu}</div>
      </div>
    </div>
  );
}
