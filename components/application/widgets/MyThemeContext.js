"use client";
import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

const MyThemeContext = createContext({
    isDarkTheme: false,
    isSystemTheme: false,
    toggleDark:() => {},
    toggleLight: () => {},
    matchSystem: () => {},
    setThemeName: () => {}
});


export function MyThemeContextProvider(props) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isSystemTheme, setIsSystemTheme] = useState(false);
    const [themeName, setThemeName] = useState(getCookie("themeName"));
    const [systemTheme, setSystemTheme] = useState("");

    useEffect(() => {
            const handleSystemThemeChange = (e) => {
                setIsDarkTheme(e.matches);
                setCookie("systemTheme", e.matches ? "dark" : "");
                document.documentElement.classList.toggle("dark", e.matches);
            };

            if (themeName === "system") {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const isSystemDark = darkModeMediaQuery.matches;

                setIsSystemTheme(true);
                setCookie("systemTheme", isSystemDark ? "dark" : "");

                if (isSystemDark) {
                    document.documentElement.classList.add("dark");
                    setIsDarkTheme(true);
                } else {
                    document.documentElement.classList.remove("dark");
                }

                darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
                return () => darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);

            } else if (themeName === "dark") {
                setIsDarkTheme(true);
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
    },[themeName, systemTheme]);

    //initial system theme in cookie.
    useEffect(() => {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setCookie("systemTheme", isSystemDark ? "dark" : "");
    }, []);

    const toggleDark = () => {
        setIsDarkTheme(true);
        setIsSystemTheme(false);    
        setCookie("themeName", "dark");
        document.documentElement.classList.add("dark");
    }

    const toggleLight = () => {
        setIsDarkTheme(false);
        setIsSystemTheme(false);    
        setCookie("themeName", "");
        document.documentElement.classList.remove("dark");
    }

    const matchSystem = () => {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        setIsSystemTheme(true);
        setIsDarkTheme(isSystemDark);
        setCookie("systemTheme", isSystemDark ? "dark" : "");
        document.documentElement.classList.toggle("dark", isSystemDark);
    }

    return (
        <MyThemeContext.Provider
            value={{
                isDarkTheme,
                isSystemTheme,
                toggleDark,
                toggleLight,
                matchSystem,
                setThemeName
            }}
        >
            {props.children}
        </MyThemeContext.Provider>
    )

}

export default MyThemeContext;