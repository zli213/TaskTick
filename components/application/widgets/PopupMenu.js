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

//Custom React hook -> useMenu
export const useMenu = () => {
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const swithMenuHandler = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      width: buttonRect.width,
      height: buttonRect.height,
      top: buttonRect.bottom,
      left: buttonRect.left,
      bottom: buttonRect.top,
      right: buttonRect.right,
    });
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
  const disableScroll = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("wheel", disableScroll, { passive: false });
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);

  var position = props.position
    ? convertPosition(props.position, props.levels)
    : null;
  const menuPosition = position
    ? {
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }
    : "";

  return (
    <>
      <div
        className={styles.popup_overlay}
        onClick={props.onOverlayClick}
      ></div>
      <div className={styles.action_btn_menu} style={position && menuPosition}>
        {props.children}
      </div>
    </>
  );
}

//Calculate Position
function convertPosition(position, levels) {
  var buttonGap = 3;
  if (position.height < 10) {
    buttonGap = 12;
  }
  console.log(buttonGap);

  const menuHeight = levels * 38 + 6;
  var newtop = position.top;
  var newleft = position.left;

  console.log(position);
  console.log(levels);
  console.log(window.innerHeight);
  console.log(menuHeight);

  if (window.innerHeight - position.bottom < menuHeight) {
    newtop = position.bottom - menuHeight - buttonGap * 2.8;
  }

  if (window.innerWidth - position.right < 130) {
    if (window.innerHeight - position.top < menuHeight / 2) {
      newtop = window.innerHeight - menuHeight - buttonGap * 4;
      newleft = position.left - 150;
    } else {
      newtop = position.bottom - menuHeight / 2 + 12;
      newleft = position.left - 150;
    }
  }

  if (newtop < 0) {
    newtop = 10;
  }

  // if (newtop - 100 > window.innerHeight) {
  //   newtop = window.innerHeight - 50;
  // }

  return {
    ...position,
    left: newleft - 130 + position.width / 2,
    top: newtop + buttonGap,
  };
}
