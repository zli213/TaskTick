/**
 * Description: Pop up menu with translucent overlay.
 * Author: Ryan
 */

"use client";
import { useCallback, useEffect } from "react";
import styles from "../../../styles/scss/components/application/widgets/popupMenu.module.scss";

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

  console.log(props.position);
  var position = props.position ? convertPosition(props.position) : null;
  const schedulerStyle = position
    ? {
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }
    : "";
    console.log(position);
  

  return (
    <>
      <div className={styles.popup_overlay} onClick={props.onOverlayClick}></div>
      <div className={styles.action_btn_menu} style={position && schedulerStyle}>
         {props.children}
      </div>
      
    </>
  );
}

function convertPosition(position) {
  var newtop = position.top;
  var newleft = position.left;

  if (window.innerHeight - position.bottom < 50) {
    newtop = position.bottom - 10;
  }
  if (window.innerWidth - position.right < 130) {
    if (window.innerHeight - position.bottom < 10) {
      newtop = position.bottom - 10;
      newleft = window.innerWidth - 140;
    } else {
      newtop = position.bottom - 190;
      newleft = position.left - 130;
    }
  }

  if (newtop < 0) {
    newtop = 10;
  }

  if (newtop - 100 > window.innerHeight) {
    newtop = window.innerHeight - 50;
  }

  return {
    ...position,
    left: newleft - 114 + position.width / 2,
    top: newtop + 2,
  };
}
