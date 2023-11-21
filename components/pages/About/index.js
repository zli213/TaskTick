// About.js
import styles from "../../../styles/scss/about.module.scss";
function About() {
  return (
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
    </div>
  );
}

export default About;
