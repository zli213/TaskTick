import React, {useState, useEffect, useCallback, useContext}from "react";
import { useRouter } from "next/navigation";
import ThemeButton from "../../application/widgets/ThemeButton";
import MyThemeContext from "../../application/widgets/MyThemeContext";
import Icon from "../../../components/application/widgets/Icon"; 
import styles from "../../../styles/scss/theme.module.scss";

const SettingTheme = () => {
  const router = useRouter();
  const themeCtx = useContext(MyThemeContext);

  function toggleDarkTheme() {
    themeCtx.toggleDarkTheme();
  }

  function toggleLightTheme() {
    themeCtx.toggleLightTheme();
  }

  const button1Colors = {
    themeColor: '#de473a',
    leftColor: '#d6d6d6',
    rightColor: '#fefdfc',
    oppositeColor: '#333333'
}

const button2Colors = {
    themeColor: '#de473a',
    leftColor: '#555555',
    rightColor: '#333333',
    oppositeColor: '#fefdfc'
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userTheme = await getTheme("johndoe123");//need to be modified
  //     storedTheme(userTheme);
  //   };
  //   fetchData();
  // }, []);

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <>
    
    <div className={styles.container}>

      {/* test button */}
      <button onClick={toggleDarkTheme}>dark</button>


      <header>
        <h4>Theme</h4>
        <button onClick={onDismiss}>
          <Icon type="close"/>
        </button>
      </header>

      <label>
        <div>
          <label className={styles.switch}>
            <input type="checkbox"></input>
            <span></span>
          </label>
        </div>
        <div>Auto Dark Mode</div>
      </label>
      <p>Automatically switch between light and dark themes when your system does.</p>

      <div>
        <h3>Your Themes</h3>
        <div>
          {/* default light theme 
           scss mess up. click function is normal.
          */}
          <ThemeButton
          onClick={toggleLightTheme}
          {...button1Colors}/>
          {/* dark theme */}
          <ThemeButton
          onClick={toggleDarkTheme}
          {...button2Colors}/>
        </div>
      </div>

    </div>
    </>
  );
};

export default SettingTheme;
