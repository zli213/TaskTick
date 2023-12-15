// components/Navbar/index.js
import styles from "../../../styles/scss/navbar.module.scss";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "../../../app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession({ options });
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        {/* add a logo picture */}
        <img className={styles.logoImage} src="./images/logo.png" alt="logo" />
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/today">Todo List</Link>
        {/* <Link href="/login">
          <button className={styles.loginButtom}>Start for free</button>
        </Link> */}
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">
            <button className={styles.loginButtom}>Sign out</button>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <button className={styles.loginButtom}>Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
