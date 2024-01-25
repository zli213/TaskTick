"use client";
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const MyThemeContext = createContext({
    isDarkTheme: false,
    applyDarkTheme:() => {},
    applyLightTheme: () => {},
    // applySystemTheme: () => {}
});


export function MyThemeContextProvider(props) {
    const { data: session } = useSession();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    //No dependency. It works every time components render.
    useEffect(() => {
        initialThemeHandler();

        //for system themes
        // const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // const darkModeChangeListener = (e) => {
        //     localStorage.setItem("isDark", e.matches + "");
        // }
        // //When darkModeMediaQuery changes, update isDarkTheme
        // darkModeMediaQuery.addEventListener("change", darkModeChangeListener);
        // //When components don't render, remove it to release memory
        // return () => {
        //     darkModeMediaQuery.removeEventListener("change", darkModeChangeListener);
        // };
    });

    //maybe use this to make it refresh instantly
    // useEffect (() => {
    //     if (isDarkTheme) {
    //         document.querySelector("main").classList.add("dark");
    //     } else {
    //         document.querySelector("main").classList.remove("dark");
    //     }
    // }, [isDarkTheme]);

    function initialThemeHandler() {
        if (session) {
            const theme = session.user.theme;
            if (theme === "dark") {
                document.querySelector("main").classList.add("dark");
                localStorage.setItem("isDark", "true");
                localStorage.setItem("isSystem", "false");
            } else if (theme === "light") {
                localStorage.setItem("isDark", "false");
                localStorage.setItem("isSystem", "false");
            } 
            // else if (theme === "system") {
            //     applySystemTheme();
            // }
        }
    }

    function applyDarkTheme() {
        document.querySelector("main").classList.add("dark");
        localStorage.setItem("isDark", "true");
    }

    function applyLightTheme() {
        document.querySelector("main").classList.remove("dark");
        localStorage.setItem("isDark", "false");
    }

    //Use matchMedia API to get user's system themes.
    // function applySystemTheme() {
    //     localStorage.setItem("isSystem", "true");
    //     const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     if (isSystemDark) {
    //         applyDarkTheme();
    //     } else {
    //         applyLightTheme();
    //     }
    // }

    return (
        <MyThemeContext.Provider value={{isDarkTheme: false, applyDarkTheme, applyLightTheme}}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;