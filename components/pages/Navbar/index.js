// // components/Navbar/index.js
// "use client";

// import { signOut, useSession } from "next-auth/react";
// import styles from "../../../styles/scss/navbar.module.scss";
// import Link from "next/link";

// const Navbar = async () => {
//   const { data: session, status } = useSession();
//   console.log(session);
//   console.log(status);
//   const user = session?.user;
//   return (
//     <nav className={styles.navbarContainer}>
//       <div className={styles.logo}>
//         {/* add a logo picture */}
//         <img className={styles.logoImage} src="./images/logo.png" alt="logo" />
//       </div>
//       <div className={styles.navLinks}>
//         <Link href="/">Home</Link>
//         <Link href="/about">About</Link>

//         {!user && (
//           <>
//             <li>
//               <Link href="/api/auth/signin" className={styles.loginButtom}>
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link href="auth/register" className={styles.registerButtom}>
//                 Register
//               </Link>
//             </li>
//           </>
//         )}
//         {user && (
//           <>
//             <buttom className={styles.signOutButtom} onClick={() => signOut()}>
//               Logout
//             </buttom>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// components/Navbar/index.js
"use client";

import styles from "../../../styles/scss/navbar.module.scss";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  const user = session?.user;
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src="./images/logo.png" alt="logo" />
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {!user && (
          <>
            <Link href="auth/signin">
              <button className={styles.loginButton}>Login</button>
            </Link>

            <Link href="/register">
              <button className={styles.loginButton}>Register</button>
            </Link>
          </>
        )}
        {user && (
          <>
            <button className={styles.loginButton} onClick={() => signOut()}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
