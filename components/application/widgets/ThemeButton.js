// import { useContext } from "react";
// import MyThemeContext from "./MyThemeContext";

// export default function ToggleButton() {
//     const themeCtx = useContext(MyThemeContext);

//     function toggleThemeHandler() {
//         themeCtx.toggleThemeHandler();
//     }

//     return (
//         <>
//             <button
//               type="button"
//               className="py-1 sm:py-2.5 px-2 sm:px-5 mr-2 bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black rounded"
//               onClick={toggleThemeHandler}
//             >
//               Toggle Theme
//             </button>
//         </>
//       );
// }

import React from "react";
import styles from "../../../styles/scss/components/application/widgets/themeButton.module.scss";
import Tick from "../../../public/icon/tick.svg";

export default function ThemeButton ({ themeColor, leftColor, rightColor, oppositeColor, themeName }) {
    const dynamicStyle = {
        '--theme--color': themeColor,
        '--theme--left--color': leftColor,
        '--theme--right--color': rightColor,
        '--theme--opposite--color': oppositeColor
    }

    return (
        <button className={styles.themeButton} style={dynamicStyle}>
        {/* leftbar pic */}
        <span className={styles.leftbarPic}>
          <span className={styles.leftOne}></span>
          <span className={styles.leftTwo}></span>
          <span className={styles.leftThree}></span>
          <span className={styles.leftFour}></span>
        </span>
        {/* main pages pic */}
        <span className={styles.mainPic}>
          <span classname={styles.headerPic}>
            <span>{themeName}</span>
            <span><Tick/></span>
          </span>
          <span className={styles.contentPic}>
            <span className={styles.round}></span>
            <span className={styles.longSpan}></span>
            <span className={styles.shortSpan}></span>
          </span>
        </span>
      </button>
    );
}