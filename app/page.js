import Link from "next/link";
import Navbar from "../components/pages/Navbar";
import styles from "../styles/scss/home.module.scss";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.home_container}>
        <div className="slogan">
          <h1 className="slogan_h1">Oranize your work</h1>
          <h1 className="slogan_h1">and life, finally.</h1>
          <p className="slogan_p">
            Become focused, organized, and calm with TaskTick. The world’s #1
          </p>
          <p className="slogan_p">task manager and to-do list app.</p>
          <Link href="/auth/register">
            <button className="standard-button">Start for free</button>
          </Link>
          <div className="background">
            <img src="/images/landpage_background.jpg" alt="background" />
          </div>
        </div>
      </div>
    </>
  );
}
