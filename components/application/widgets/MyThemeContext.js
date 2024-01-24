"use client";
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const MyThemeContext = createContext({
    isDarkTheme: false,
    toggleDarkTheme: () => {},
    toggleLightTheme: () => {},
});


export function MyThemeContextProvider(props) {
    const { data: session } = useSession();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => initialThemeHandler());

    function initialThemeHandler() {
        if (session) {
            const theme = session.user.theme;
            if (theme === "dark") {
                document.querySelector("main").classList.add("dark");
                localStorage.setItem("isDark", "true");
                setIsDarkTheme(true);
            } else {
                localStorage.setItem("isDark", "false");
                setIsDarkTheme(false);
            }
        }
    }

    function toggleDarkTheme() {
        document.querySelector("main").classList.add("dark");
        localStorage.setItem("isDark", "true");
        setIsDarkTheme(true);
    }

    function toggleLightTheme() {
        document.querySelector("main").classList.remove("dark");
        localStorage.setItem("isDark", "false");
        setIsDarkTheme(false);
    }

    return (
        <MyThemeContext.Provider value={{ isDarkTheme: false ,toggleDarkTheme, toggleLightTheme }}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;