import "./UserMenu.scss";
import Link from "next/link";

export function UserMenu({ closeUserMenuHandler, settingCardHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover" onClick={closeUserMenuHandler}>
      <div className="menu_box" onClick={containerClickHandler}>
        <div className="avatar_container">Avatar</div>
        <div onClick={settingCardHandler}>Settings</div>
      
        <div>Logout</div>
      </div>
    </div>
  );
}
