import React, {useEffect, useCallback, useContext}from "react";
import { useRouter } from "next/navigation";
import ThemeButton from "../../application/widgets/ThemeButton";
import MyThemeContext from "../../application/widgets/MyThemeContext";
import Icon from "../../../components/application/widgets/Icon"; 
import styles from "../../../styles/scss/theme.module.scss";

const SettingTheme = () => {
  const router = useRouter();
  const {
    isDarkTheme,
    isSystemTheme,
    setIsDarkTheme,
    setIsSystemTheme,
    toggleDark,
    toggleLight,
    matchSystem} = useContext(MyThemeContext);

  useEffect(() => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.checked = isSystemTheme ? true : false;
  }, [isDarkTheme, isSystemTheme]);

  function applyDarkTheme() {
    toggleDark();
    setIsDarkTheme(true);
    saveChange("dark");
  }

  function applyLightTheme() {
    toggleLight();
    setIsDarkTheme(false);
    saveChange("light");
  }

  function applySystemTheme() {
    matchSystem();
    setIsSystemTheme(true);
    saveChange("system");
  }

  function applydefault() {
    toggleLight();
    setIsDarkTheme(false);
    setIsSystemTheme(false);
    saveChange("light");
  }

  function handleCheckboxChange (event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      applySystemTheme();
    } else {
      applydefault();
    }
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

  const saveChange = async (currentTheme) => {
    try {
      const cur = currentTheme;
      const response = await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cur }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const res = await response.json();
        console.log("Error message: ", res.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <>  
    <div className={styles.container}>
      <header>
        <h4>Theme</h4>
        <button onClick={onDismiss}>
          <Icon type="close" id="icon"/>
        </button>
      </header>
      <p>Personalize your Todoist with colors to match your style, mood, and personality.</p>
      <label className={styles.switchContainer}>
        <div>
          <label className={styles.switch}>
            <input type="checkbox" onChange={handleCheckboxChange}></input>
            <span></span>
          </label>
        </div>
        <div>Auto Dark Mode</div>
      </label>

      <p className={styles.notice}>Automatically switch between light and dark themes when your system does.</p>
      <h4>Your Themes</h4>
      <div className={styles.themeButtons}>
          {/* default light theme*/}
          <ThemeButton
          onClick={applyLightTheme}
          themeName={"Light"}
          isSelected={!isDarkTheme}
          isDisabled={isSystemTheme || !isDarkTheme}
          {...button1Colors}/>

          {/* dark theme */}
          <ThemeButton
          onClick={applyDarkTheme}
          themeName={"Dark"}
          isSelected={isDarkTheme}
          isDisabled={isSystemTheme || isDarkTheme}
          {...button2Colors}/>
      </div>

    </div>
    </>
  );
};

export default SettingTheme;