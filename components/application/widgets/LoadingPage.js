import styles from "../../../styles/scss/components/application/widgets/loadingPage.module.scss";
export default function LoadingPage(props) {
    const isDarkTheme = localStorage.getItem("isDarkTheme") === "y";
    const style = isDarkTheme ? `${styles.container} ${styles.dark}` : styles.container;
    return (
        <div id="LoadingPage" className={style}>
        </div>
    )
}