"use client";
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

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

    //No dependency. It works every time components render.
    useEffect(() => {
        if (session) {
            const userTheme = session.user.theme;
            console.log("user theme: ", userTheme);
            if (userTheme === "system") {
                setIsSystemTheme(true);
    
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isSystemDark) {
                    document.querySelector("main").classList.add("dark");
                    setIsDarkTheme(true);
                }
            } else if (userTheme === "dark") {
                setIsDarkTheme(true);
                document.querySelector("main").classList.add("dark");
            }
    
        }

        //For system themes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const darkModeChangeListener = (e) => {
            setIsDarkTheme(e.matches);
        }

        //When darkModeMediaQuery changes, update isDarkTheme
        darkModeMediaQuery.addEventListener("change", darkModeChangeListener);
        return () => {
            darkModeMediaQuery.removeEventListener("change", darkModeChangeListener);
        };
    },[session]);


    function toggleDark () {
        setIsDarkTheme(true);
        document.querySelector("main").classList.add("dark");
    }

    function toggleLight () {
        setIsDarkTheme(false);
        document.querySelector("main").classList.remove("dark");
    }

    function matchSystem () {
        setIsSystemTheme(true);
        console.log("in context, isSystem: ", isSystemTheme);
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
            toggleDark();
        } else {
            toggleLight();
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