import "./UserMenu.scss";
import Link from "next/link";

export function UserMenu({ closeUserMenuHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover" onClick={closeUserMenuHandler}>
      <div className="menu_box" onClick={containerClickHandler}>
        <div className="avatar_container">Avatar</div>
        <Link href="/app/settings/account">
          <div onClick={closeUserMenuHandler}>Settings</div>
        </Link>
        <Link href="/app/settings/theme">
          <div onClick={closeUserMenuHandler}>Theme</div>
        </Link>
        <div>Logout</div>
      </div>
    </div>
  );
}
