"use client";

import { useState } from "react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import NewTaskCard from "./NewTaskCard";

export function ListNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const openMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const openAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  const closeAddTaskCard = () => {
    setAddTask(false);
  };

  const closeUserMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="list_nav">
      <div className="flex_center">
        <div>Menu</div>
        <Link href="/app/today">Home</Link>
        <div>Search</div>
      </div>
      <div className="flex_center">
        <div
          onClick={openAddTaskCard}
          className="avatar_button"
          closeHandler={closeAddTaskCard}
        >
          Add task
        </div>
        <div onClick={openMenu} className="avatar_button">
          Avatar
        </div>
        {showMenu && <UserMenu closeUserMenuHandler={closeUserMenu} />}
        {addTask && <NewTaskCard closeCardHandler={closeAddTaskCard} />}
      </div>
    </nav>
  );
}
