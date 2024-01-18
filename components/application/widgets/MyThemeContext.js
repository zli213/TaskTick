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
            }
        }
    }

    function toggleDarkTheme() {
        document.querySelector("main").classList.add("dark");
    }

    function toggleLightTheme() {
        document.querySelector("main").classList.remove("dark");
    }

    return (
        <MyThemeContext.Provider value={{ toggleDarkTheme, toggleLightTheme }}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;