// About.js
"use client";
import styles from "../../../styles/scss/about.module.scss";
import Navbar from "../Navbar";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(
  () => import("../About/MapComponent"), // 换成您的地图组件路径
  { ssr: false }
);
function About() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.upCard}>
          <div className={styles.teamImage}>
            <h1>About Us</h1>
            <img
              clasName={styles.teamPhoto}
              src="/images/teamImage.png"
              alt="teamImage"
            />
          </div>
          <div className="mapCard"></div>
        </div>
        <div className="middleCard"></div>
        <MapWithNoSSR />
      </div>
    </div>
  );
}

export default About;
