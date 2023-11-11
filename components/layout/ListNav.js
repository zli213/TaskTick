"use client";

import { useState } from "react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

export function ListNav() {
  const [showMenu, setMenu] = useState(false);
  const openMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <nav className="list_nav">
      <div className="flex_center">
        <div>Menu</div>
        <Link href="/app/today">Home</Link>
        <div>Search</div>
      </div>
      <div className="flex_center">
        <div>Add task</div>
        <div onClick={openMenu} className='avatar_button'>Avatar</div>
        {showMenu && <UserMenu />}
      </div>
    </nav>
  );
}
