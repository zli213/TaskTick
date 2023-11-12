import "./UserMenu.scss";

export function UserMenu({ closeUserMenuHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover" onClick={closeUserMenuHandler}>
      <div className="menu_box" onClick={containerClickHandler}>
        <div className="avatar_container">Avatar</div>
        <div>Setting</div>
        <div>Logout</div>
      </div>
    </div>
  );
}
