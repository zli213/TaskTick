"use client";
import { createContext, useEffect } from 'react';
import { useSession } from "next-auth/react";

const MyThemeContext = createContext({
    toggleThemeHandler: () => {},
});


export function MyThemeContextProvider(props) {
    const { data: session } = useSession();

    useEffect(() => initialThemeHandler());

    function initialThemeHandler() {
        if (session) {
            const theme = session.user.theme;
            if (theme === "dark") {
                document.querySelector("main").classList.add("dark");
                localStorage.setItem("isDark", true);
            } else {
                localStorage.setItem("isDark", false);
            }
        }
    }

    function toggleDarkTheme() {
        document.querySelector("main").classList.add("dark");
        localStorage.setItem("isDark", true);
    }

    function toggleLightTheme() {
        document.querySelector("main").classList.remove("dark");
        localStorage.setItem("isDark", false);
    }

    return (
        <MyThemeContext.Provider value={{ toggleDarkTheme, toggleLightTheme }}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;