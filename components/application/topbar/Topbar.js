"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import NewTaskCard from "./NewTaskCard";
import SearchCard from "./SearchCard";
import Link from "next/link";
import styles from "../../../styles/scss/topbar.module.scss";
import Icon from "../widgets/Icon";

const Topbar = ({ switchHandler }) => {
  const [showUserMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [search, setSearch] = useState(false);

  const switchUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const switchAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  const switchSearchCard = () => {
    setSearch((prevState) => !prevState);
  };

  return (
    <nav className={styles.app_nav}>
      <div className={`${styles.avatar_button} ${styles.flex_center}`}>
        <div onClick={switchHandler} className={styles.flex_center}>
          <Icon type="top_menu" />
        </div>
        <Link href="/application/today" className={styles.flex_center}>
          <Icon type="home" />
        </Link>
        <div onClick={switchSearchCard} className={styles.flex_center}>
          <Icon type="search" />
        </div>
        {search && <SearchCard closeCardHandler={switchSearchCard} />}
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
