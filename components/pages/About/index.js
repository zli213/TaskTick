// About.js
"use client";
import styles from "../../../styles/scss/about.module.scss";
import Navbar from "../Navbar";
import dynamic from "next/dynamic";
import MemberModal from "../../../app/about/@memberModal/page";
import Gallery from "../About/GalleryComponent";
const MapWithNoSSR = dynamic(() => import("../About/MapComponent"), {
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
            <MapWithNoSSR />
          </div>
        </div>
        <div className={styles.middleCard}>
          <Gallery />
        </div>
      </div>
    </div>
  );
}

export default About;
