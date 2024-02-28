import Link from "next/link";
import Navbar from "../components/pages/Navbar";
import styles from "../styles/scss/home.module.scss";
import FooterPage from "../components/pages/About/widgets/FooterPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.home_container}>
        <div className={styles.intro_container}>
          <div className={styles.slogan}>
            <div>
              <h1>Organize your work</h1>
              <h1>and life, finally.</h1>
            </div>
            <div>
              <p className="slogan_p">
                Become focused, organized, and calm with TaskTick.
              </p>
              <p className="slogan_p">
                The world’s #1 task manager and to-do list app.
              </p>
            </div>
            <Link href="/auth/register">
              <button className="standard-button">Start for free</button>
            </Link>
          </div>
          <div className={styles.home_pic}>
            <img
              src="/images/listpage.png"
              alt="background"
              className={styles.pic_list}
            ></img>
            <img
              src="/images/mobile.png"
              alt="background"
              className={styles.pic_list2}
            ></img>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
