"use client";

import { useState } from "react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import NewTaskCard from "./NewTaskCard";

export function ListNav({switchHandler}) {
  const [showUserMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const switchUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const switchAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  return (
    <nav className="list_nav">
      <div className="avatar_button flex_center">
        <div onClick={switchHandler}>Menu</div>
        <Link href="/app/today">Home</Link>
        <div>Search</div>
      </div>
      <div className="flex_center">
        <div onClick={switchAddTaskCard} className="avatar_button">
          Add task
        </div>
        <div onClick={switchUserMenu} className="avatar_button">
          Avatar
        </div>
        {showUserMenu && <UserMenu closeUserMenuHandler={switchUserMenu} />}
        {addTask && <NewTaskCard closeCardHandler={switchAddTaskCard} />}
      </div>
    </nav>
  );
}
