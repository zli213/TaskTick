"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import NewTaskCard from "./NewTaskCard";
import Link from "next/link";
import styles from "../../../styles/scss/topbar.module.scss";

const Topbar = ({ switchHandler }) => {
  const [showUserMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const switchUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const switchAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  return (
    <nav className={styles.app_nav}>
      <div className={`${styles.avatar_button} ${styles.flex_center}`}>
        <div onClick={switchHandler}>Menu</div>
        <Link href="/application/today">Home</Link>
        <div>Search</div>
      </div>
      <div className={styles.flex_center}>
        <div onClick={switchAddTaskCard} className={styles.avatar_button}>
          Add task
        </div>
        <div onClick={switchUserMenu} className={styles.avatar_button}>
          Avatar
        </div>
        {showUserMenu && <UserMenu closeUserMenuHandler={switchUserMenu} />}
        {addTask && <NewTaskCard closeCardHandler={switchAddTaskCard} />}
      </div>
    </nav>
  );
};

export default Topbar;
