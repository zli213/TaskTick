"use client";

import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import Link from "next/link";
import styles from "../../../styles/scss/topbar.module.scss";
import Icon from "../widgets/Icon";
import AddTask from "../widgets/AddTask";

const Topbar = ({ switchHandler }) => {
  const [showUserMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const switchUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const switchAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  const disableScroll = (event) => {
    const menu = document.querySelector('[scrollable="scrollable_area"]');
    const isInsideMenu = menu && menu.contains(event.target);

    if (!isInsideMenu) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (addTask) {
      document.addEventListener("wheel", disableScroll, { passive: false });
      document.addEventListener("touchmove", disableScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("touchmove", disableScroll);
    };
  }, [addTask]);

  return (
    <nav className={styles.app_nav}>
      <div className={styles.flex_center}>
        <div
          onClick={switchHandler}
          className={`${styles.icon_button} ${styles.flex_center}`}
        >
          <Icon type="top_menu" />
        </div>
        <Link
          href="/application/today"
          className={styles.icon_button}
        >
          <Icon type="home" />
        </Link>
        <div className={styles.icon_button}>
          <Icon type="search" />
        </div>
      </div>
      <div className={styles.flex_center}>
        <div onClick={switchAddTaskCard} className={styles.avatar_button}>
          <span className={styles.icon_btn}>
            <Icon type="add" />
          </span>
          Add task
        </div>
        <div onClick={switchUserMenu} className={styles.avatar_button}>
          Avatar
        </div>
        {showUserMenu && <UserMenu closeUserMenuHandler={switchUserMenu} />}
        {addTask && (
          <div className={styles.overlay_styles} onClick={switchAddTaskCard}>
            <div
              className={`${styles.add_task_card} ${addTask && styles.show}`}
              onClick={containerClickHandler}
            >
              <AddTask
                closeCardHandler={switchAddTaskCard}
                openEditor={addTask}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
