/**
 * Pop up menu with transparent overlay.
 * Author: Ryan
 * 
 * This menu can automatically adjust the position displayed on the screen based on the clicked position.
 * The content in the menu should edit mannully at where you import this component.
 */

"use client";
import { useEffect } from "react";
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

  var position = props.position ? convertPosition(props.position) : null;
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
      <div
        className={styles.action_btn_menu}
        style={position && menuPosition}
      >
        {props.children}
      </div>
    </>
  );
}

function convertPosition(position) {
  var newtop = position.top;
  var newleft = position.left;

  if (window.innerHeight - position.bottom < 280) {
    newtop = position.bottom - 290;
  }
  if (window.innerWidth - position.right < 130) {
    if (window.innerHeight - position.bottom < 280) {
      newtop = position.bottom - 290;
      newleft = window.innerWidth - 170;
    } else {
      newtop = position.bottom - 150;
      newleft = position.left - 160;
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
    left: newleft - 130 + position.width / 2,
    top: newtop + 5,
  };
}
