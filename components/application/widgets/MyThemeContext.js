"use client";
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { getCookie, setCookie } from "cookies-next";

const MyThemeContext = createContext({
    isDarkTheme: false,
    isSystemTheme: false,
    setIsDarkTheme: () => {},
    setIsSystemTheme: () => {},
    toggleDark:() => {},
    toggleLight: () => {},
    matchSystem: () => {}
});


export function MyThemeContextProvider(props) {
    const { data: session } = useSession();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isSystemTheme, setIsSystemTheme] = useState(false);

    useEffect(() => {
            const themeName = getCookie("themeName");
            console.log("get themeName in Context=", themeName);

            if (themeName === "system") {
                setIsSystemTheme(true);
    
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isSystemDark) {
                    document.documentElement.classList.add("dark");
                    setIsDarkTheme(true);
                    setCookie("systemTheme", "dark")
                } else {
                    document.documentElement.classList.remove("dark");
                    setCookie("systemTheme", "")
                }
            } else if (themeName === "dark") {
                setIsDarkTheme(true);
                document.documentElement.classList.add("dark");
            } else if(themeName === "light" || "") {
                document.documentElement.classList.remove("dark");
            }
    },[session]);

    useEffect(() => {
        if(isSystemTheme) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const darkModeChangeListener = (e) => {
                setIsDarkTheme(e.matches);
            }

            //When darkModeMediaQuery changes, update isDarkTheme
            darkModeMediaQuery.addEventListener("change", darkModeChangeListener);
            return () => {
                darkModeMediaQuery.removeEventListener("change", darkModeChangeListener);
            };
        }
    }, [isSystemTheme])


    function toggleDark () {
        setIsDarkTheme(true);
        setCookie("themeName", "dark");
        document.documentElement.classList.add("dark");
    }

    function toggleLight () {
        setIsDarkTheme(false);
        setCookie("themeName", "");
        document.documentElement.classList.remove("dark");
    }

    function matchSystem () {
        setIsSystemTheme(true);
        console.log("in context, isSystem: ", isSystemTheme);
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
            setIsDarkTheme(true);
            setCookie("systemTheme", "dark")
            document.documentElement.classList.add("dark");    
        } else {
            setIsDarkTheme(false);
            setCookie("systemTheme", "")
            document.documentElement.classList.remove("dark");
        }
    }

    return (
        <MyThemeContext.Provider
            value={{
                isDarkTheme,
                isSystemTheme,
                setIsDarkTheme,
                setIsSystemTheme,
                toggleDark,
                toggleLight,
                matchSystem
            }}
        >
            {props.children}
        </MyThemeContext.Provider>
    )

}

export default MyThemeContext;