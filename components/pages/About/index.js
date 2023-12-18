// About.js
"use client";
import styles from "../../../styles/scss/about.module.scss";
import Navbar from "../Navbar";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("../About/MapComponent"), {
  ssr: false,
});
function About(props) {
  return (
    <div className="aboutPageComponent">
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
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
