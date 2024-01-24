import React, {useState, useEffect, useCallback, useContext}from "react";
import { useRouter } from "next/navigation";
import ThemeButton from "../../application/widgets/ThemeButton";
import MyThemeContext from "../../application/widgets/MyThemeContext";
import Icon from "../../../components/application/widgets/Icon"; 
import styles from "../../../styles/scss/theme.module.scss";

const SettingTheme = () => {
  const router = useRouter();
  const themeCtx = useContext(MyThemeContext);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("isDark") === "true";
    console.log("Get from localStorage: ", flag);
    setIsDark(flag);
  }, []);

  function toggleDarkTheme() {
    themeCtx.toggleDarkTheme();
    saveChange("dark");
    setIsDark(true);
  }

  function toggleLightTheme() {
    themeCtx.toggleLightTheme();
    saveChange("light");
    setIsDark(false);
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
            <input type="checkbox"></input>
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
          onClick={toggleLightTheme}
          themeName={"Light"}
          isSelected={!isDark}
          isDisabled={!isDark}
          {...button1Colors}/>

          {/* dark theme */}
          <ThemeButton
          onClick={toggleDarkTheme}
          themeName={"Dark"}
          isSelected={isDark}
          isDisabled={isDark}
          {...button2Colors}/>
      </div>

    </div>
    </>
  );
};

export default SettingTheme;
