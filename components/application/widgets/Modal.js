/**
 * Description: Pop up window with translucent overlay.
 * Author: Kelvin
 */

"use client";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/scss/modal.module.scss";

export default function Modal(props) {
  const router = useRouter();
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  // const disableScroll = (event) => {
  //   event.preventDefault();
  // };

  // useEffect(() => {
  //   document.addEventListener("wheel", disableScroll, { passive: false });
  //   document.addEventListener("touchmove", disableScroll, { passive: false });

  //   return () => {
  //     document.removeEventListener("wheel", disableScroll);
  //     document.removeEventListener("touchmove", disableScroll);
  //   };
  // }, []);

  const onDismiss = useCallback(() => {
    const currentPage = localStorage.getItem("lastPage");
    router.push(`/application/${currentPage}`, { scroll: false });
    router.refresh();
  }, [router]);

  return (
    <>
      <div className={styles.overlay_styles} onClick={onDismiss}>
        <div onClick={containerClickHandler}>{props.children}</div>
      </div>
    </>
  );
}
