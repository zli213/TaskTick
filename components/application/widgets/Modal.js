/**
 * Description: Pop up window with translucent overlay.
 * Author: Kelvin
 */

"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  color: "#000",
  padding: "2rem",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ children }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={onDismiss}></div>
      <div style={MODAL_STYLES}>
        <button onClick={onDismiss}>close</button>
        {children}
      </div>
    </>
  );
}
