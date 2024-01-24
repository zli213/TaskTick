import React from "react";
import styles from "../../../styles/scss/components/application/widgets/themeButton.module.scss";
import Tick from "../../../public/icon/tick.svg";

export default function ThemeButton ({ onClick, themeName, isSelected, isDisabled, themeColor, leftColor, rightColor, oppositeColor  }) {
    const dynamicStyle = {
        '--theme--color': themeColor,
        '--theme--left--color': leftColor,
        '--theme--right--color': rightColor,
        '--theme--opposite--color': oppositeColor
    }

    const buttonClassName = isDisabled ? `${styles.disabled} ${styles.themeButton}` : styles.themeButton;

    return (
        <button onClick={onClick} disabled={isDisabled} className={buttonClassName} style={dynamicStyle} type="button" >
        {/* leftbar pic */}
        <span className={styles.leftbarPic}>
          <span className={styles.leftOne}></span>
          <span className={styles.leftTwo}></span>
          <span className={styles.leftThree}></span>
          <span className={styles.leftFour}></span>
        </span>

        {/* main pages pic */}
        <span className={styles.mainPic}>

          <span className={styles.headerPic}>
            <label>{themeName}</label>
            {isSelected && <Tick/>}
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