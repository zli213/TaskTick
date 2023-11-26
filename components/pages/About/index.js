// About.js
"use client";
import styles from "../../../styles/scss/about.module.scss";
import Navbar from "../Navbar";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(() => import("../About/MapComponent"), {
  ssr: false,
});
function About() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.upCard}>
          <div className={styles.teamImage}>
            <h1>About Us</h1>
            <img
              className={styles.teamPhoto}
              src="/images/teamImage.png"
              alt="teamImage"
            />
          </div>
          <div className={styles.mapCard}>
            <MapWithNoSSR />
          </div>
        </div>
        <div className="middleCard"></div>
      </div>
    </div>
  );
}

export default About;
