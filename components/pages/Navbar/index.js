"use client";

import styles from "../../../styles/scss/navbar.module.scss";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { setCookie } from "cookies-next";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        <Link href="/" >
          <img className={styles.logoImage} src="/images/logo.png" alt="logo" />
          TaskTick
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        |
        {!user && (
          <>
            <Link href="/auth/signin">
              <button className={styles.loginButton}>Login</button>
            </Link>

            <Link href="/auth/register">
              <button className={styles.loginButton}>Register</button>
            </Link>
          </>
        )}
        {user && (
          <>
            <button className={styles.loginButton} onClick={()=>{ signOut(); setCookie("themeName", "")}}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
