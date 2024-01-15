"use client";
import { createContext, ReactElement, useEffect, useState } from 'react';
//import { useTheme } from 'next-themes';

const MyThemeContext = createContext({
    isDarkTheme: true,
    toggleThemeHandler: () => {},
});


export function MyThemeContextProvider(props) {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    useEffect(() => initialThemeHandler());

    function isLocalStorageEmpty() {
        return !localStorage.getItem("isDarkTheme");
    }

    function initialThemeHandler() {
        if (isLocalStorageEmpty()) {
            localStorage.set("isDarkTheme", `true`);
            document.querySelector("body").classList.add("dark");
            setIsDarkTheme(true);
        } else {
            const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
            if (isDarkTheme) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
            setIsDarkTheme(() => isDarkTheme);
        }
    }

    function toggleThemeHandler() {
        const isDarkTheme = JSON.parse(localStorage.get("isDarkTheme"));
        setIsDarkTheme(!isDarkTheme);
        toggleDarkThemeToBody();
        setValueToLocalStorage();
    }

    function toggleDarkThemeToBody() {
        document.querySelector("body").classList.toggle("dark");
    }

    function setValueToLocalStorage() {
        localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
    }

    return (
        <MyThemeContext.Provider value={{ isDarkTheme: true, toggleThemeHandler }}>
            {props.children}
        </MyThemeContext.Provider>
    );
}

export default MyThemeContext;