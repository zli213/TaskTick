"use client";
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const MyThemeContext = createContext({
    isDarkTheme: false,
    isSystemTheme: false,
    applyDarkTheme: () => {},
    applyLightTheme: () => {},
    applySystemTheme: () => {},
});


export function MyThemeContextProvider(props) {
    const { data: session } = useSession();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isSystemTheme, setIsSystemTheme] = useState(false);

    //No dependency. It works every time components render.
    useEffect(() => {
        initialThemeHandler();
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const darkModeChangeListener = (e) => {
            setIsDarkTheme(e.matches);
            localStorage.setItem("isDark", e.matches + "");
        }

        //When darkModeMediaQuery changes, update isDarkTheme
        darkModeMediaQuery.addEventListener("change", darkModeChangeListener);
        //When components don't render, remove it to release memory
        return () => {
            darkModeMediaQuery.removeEventListener("change", darkModeChangeListener);
        };
    });

    function initialThemeHandler() {
        if (session) {
            const theme = session.user.theme;
            if (theme === "dark") {
                applyDarkTheme();
            } else if (theme === "light") {
                applyLightTheme();
            } else if (theme === "system") {
                setIsSystemTheme(true);
                applySystemTheme();
            }
        }
    }

    function applyDarkTheme() {
        document.querySelector("main").classList.add("dark");
        localStorage.setItem("isDark", "true");
        setIsDarkTheme(true);
    }

    function applyLightTheme() {
        document.querySelector("main").classList.remove("dark");
        localStorage.setItem("isDark", "false");
        setIsDarkTheme(false);
    }

    //Use matchMedia API to get user's system themes.
    function applySystemTheme() {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    }

    return (
        <MyThemeContext.Provider value={{ isDarkTheme: false ,isSystemTheme: false, applyDarkTheme, applyLightTheme, applySystemTheme }}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;