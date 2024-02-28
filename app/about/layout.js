import FooterPage from "../../components/pages/About/widgets/FooterPage";
import styles from "../../styles/scss/about.module.scss";

export default function AboutLayout(props) {
  return (
    <>
      <div className={styles.about_page}>
        {props.children}
        {props.memberModal}
      </div>
      <FooterPage />
    </>
  );
}
