/**
 * Pop up menu with transparent overlay.
 * Author: Ryan
 *
 * This menu can automatically adjust the position displayed on the screen based on the clicked position.
 * The content in the menu should edit mannully at where you import this component.
 *
 * @param
 * onOverlayClick  - Show/hide function
 * position        - Click position of cursor, will calculate the position of menu need to be shown
 * levels          - How many lines are there in the menu
 *
 * @usage
 * This compoent include a custom hook "useMenu", which will help you to control the show/hide of menu.
 * When you what to use this component,
 * 1. import both compoent and useMenu:
 *  `import PopupMenu, {useMenu} from "./PopupMenu";`
 * 2. use hook and get the variable and switchfunction of Menu
 *  `const {showItemMenu, buttonPosition, swithMenuHandler} = useMenu();`
 * 3. In the component where you need popup menu, in its 'return' code, give the button onclick function
 * and write menu like this:
 *  `<span onClick={swithMenuHandler} >
 *   {showItemMenu && (
 *      <PopupMenu onOverlayClick={swithMenuHandler} position={buttonPosition} levels="2">
 *          ...
 *      </PopupMenu>
 *   )}
 *  `
 *
 * Example is in MyProjectItem.js
 */

"use client";

import { useState, useEffect } from "react";
import styles from "../../../styles/scss/components/application/widgets/popupMenu.module.scss";
import { convertPosition2 } from "../../../public/CommonFunctions";

//Custom React hook -> useMenu
export const useMenu = () => {
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({});

  const swithMenuHandler = (event) => {
    /** event will be undefined when the internal btn is clicked.
     *  the menu need to be hide if some btns such as edit is clicked.
     */
    if (event) {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      setButtonPosition({
        width: buttonRect.width,
        height: buttonRect.height,
        top: buttonRect.bottom,
        left: buttonRect.left,
        bottom: buttonRect.top,
        right: buttonRect.right,
        pX: 0,
        pY: 0,
      });
    }
    setShowItemMenu((preState) => !preState);
  };

  return {
    showItemMenu,
    buttonPosition,
    swithMenuHandler,
  };
};

//PopupMenu
export default function PopupMenu(props) {
  const [menuPosition, setMenuPosition] = useState(() => {
    const newPostion = convertPosition2(
      props.position,
      props.levels,
      props.menuWidth ? props.menuWidth : 260
    );
    return {
      position: "absolute",
      top: `${newPostion.pY}px`,
      left: `${newPostion.pX}px`,
    };
  });

  const disableScroll = (event) => {
    const menu = document.querySelector('[scrollable="scrollable_area"]');
    const isInsideMenu = menu && menu.contains(event.target);

    if (!isInsideMenu) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const updateWindowSize = () => {
    const newPostion = convertPosition2(
      props.position,
      props.levels,
      props.menuWidth ? props.menuWidth : 260
    );
    setMenuPosition({
      position: "absolute",
      top: `${newPostion.pY}px`,
      left: `${newPostion.pX}px`,
    });
  };

  useEffect(() => {
    document.addEventListener("wheel", disableScroll, { passive: false });
    document.addEventListener("touchmove", disableScroll, { passive: false });
    window.addEventListener("resize", updateWindowSize);

    return () => {
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("touchmove", disableScroll);
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <>
      <div
        className={styles.popup_overlay}
        onClick={props.onOverlayClick}
      ></div>
      <div
        className={styles.action_btn_menu}
        style={{ ...menuPosition, width: props.menuWidth + "px" }}
      >
        {props.children}
      </div>
    </>
  );
}
