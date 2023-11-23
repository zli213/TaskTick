/**
 * Description: Pop up window with translucent overlay.
 * Author: Kelvin
 */

"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../../styles/scss/modal.module.scss";

export default function Modal({ children }) {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };

  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <div className={styles.overlay_styles} onClick={onDismiss}>
        <div className={styles.modal_container} onClick={containerClickHandler}>
          {children}
        </div>
      </div>
    </>
  );
}
