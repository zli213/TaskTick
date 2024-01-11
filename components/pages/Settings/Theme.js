// import React, {useState,useEffect, useCallback}from "react";
// import { useRouter } from "next/navigation";
// import getTheme from "../../../src/utils/data/getTheme";
// import CloseButton from "../../../public/icon/close.svg";
// import styles from "../../../styles/scss/theme.module.scss";
// import ThemeToggle from "../../application/widgets/ThemeToggle";
import ModeToggle from "../../application/widgets/ToggleButton";

const SettingTheme = () => {
  // const router = useRouter();
  // const [theme, storedTheme] = useState("");


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userTheme = await getTheme("johndoe123");//need to be modified
  //     storedTheme(userTheme);
  //   };
  //   fetchData();
  // }, []);

  // const onDismiss = useCallback(() => {
  //   const currentPage = localStorage.getItem("lastPage");
  //   router.push(`/application/${currentPage}`, { scroll: false });
  //   router.refresh();
  // }, [router]);

  return (
    <>
    <ModeToggle/>
    {/* <div className={styles.container}>
    <header>
        <h4>Account Information</h4>
        <button onClick={onDismiss}>
          <CloseButton/>
        </button>
      </header>
      <ThemeToggle
        selectedTheme={theme}
      />
    </div> */}
    </>
  );
};

export default SettingTheme;
