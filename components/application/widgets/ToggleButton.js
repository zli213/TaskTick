"use client";

import React from "react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <>
        < button onClick={() => setTheme("light")}>
          Light
        </button>
        
        <button onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button onClick={() => setTheme("system")}>
          System
        </button>
    </>
  )
}
