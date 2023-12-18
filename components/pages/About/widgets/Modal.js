"use client";
import React, { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/scss/teamMember.module.scss";

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div ref={overlay} className={styles.modal_overlay} onClick={onClick}>
      <div ref={wrapper} className={styles.modal_wrapper}>
        {children}
      </div>
    </div>
  );
}
