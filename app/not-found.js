/**
 * 404 page for menu
 */

import Link from "next/link";
import styles from "../styles/scss/notFound.module.scss";

export default function NotFound() {
  return (
    <>
      <nav className={styles.logo_style}> Our Logo</nav>
      <div className={styles.info_content}> 
        <h1>Uh-Oh...</h1>
        <p>This is not the web page you are looking for.</p>
        <div>
          <button>
            <Link href="/">Go back to Home</Link>
          </button>
        </div>
        <img className={styles.image_style}  src="/images/404error.webp" alt="404 Error" />
      </div>
      <div> Foot information</div>
    </>
  );
}
