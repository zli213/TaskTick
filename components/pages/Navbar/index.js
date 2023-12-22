// components/Navbar/index.js
"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "../../../styles/scss/navbar.module.scss";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "../../../app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  // const session = await getServerSession({ options });
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  const user = session?.user;
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        {/* add a logo picture */}
        <img className={styles.logoImage} src="./images/logo.png" alt="logo" />
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>

        {!user && (
          <>
            <li>
              <Link href="/api/auth/signin" className={styles.loginButtom}>
                Login
              </Link>
            </li>
            <li>
              <Link href="auth/register" className={styles.registerButtom}>
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <buttom className={styles.signOutButtom} onClick={() => signOut()}>
              Logout
            </buttom>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
