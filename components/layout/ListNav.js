"use client";

import { useState } from "react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import NewTaskCard from "./NewTaskCard";
import SettingsCard from "./Settings";

export function ListNav({ switchHandler }) {
  const [showUserMenu, setShowMenu] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [showSetting, setShowSettings] = useState({
    state: false,
    submenu: null,
  });

  const switchUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const switchAddTaskCard = () => {
    setAddTask((prevState) => !prevState);
  };

  const switchSettingAccountCard = () => {
    // if (newState == false) {
    //   setShowSettings({ state: newState, submenu: null });
    // } else {
    //   setShowSettings({ state: true, submenu: subMenu });
    // }
    setShowSettings({state: true, submenu: 'account'})
    setShowMenu((prevState) => !prevState);
  };

  const closeSettingCard = () => {
    setShowSettings({state: false});
  }

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
        {showUserMenu && (
          <UserMenu
            closeUserMenuHandler={switchUserMenu}
            settingCardHandler={switchSettingAccountCard}
          />
        )}
        {addTask && <NewTaskCard closeCardHandler={switchAddTaskCard} />}
        {showSetting.state && <SettingsCard subMenu={showSetting.submenu} closeHandler={closeSettingCard}/>}
      </div>
    </nav>
  );
}
