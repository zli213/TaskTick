// components/Navbar/index.js
import styles from "../../../styles/scss/navbar.module.scss";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        {/* add a logo picture */}
        <img className={styles.logoImage} src="./images/logo.png" alt="logo" />
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/app/123">Todo List</Link>
        <Link href="/login">
          <button className={styles.loginButtom}>Start for free</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
