import styles from "../../../styles/scss/userMenu.module.scss";
import Link from "next/link";

export default function UserMenu({ closeUserMenuHandler }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="click_close_cover" onClick={closeUserMenuHandler}>
      <div className={styles.menu_box} onClick={containerClickHandler}>
        <div className="avatar_container">Avatar</div>
        <Link href="/application/setting/account" scroll={false}>
          <span onClick={closeUserMenuHandler}>Setting</span>
        </Link>

        <div>Logout</div>
      </div>
    </div>
  );
}
