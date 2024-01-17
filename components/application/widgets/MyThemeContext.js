"use client";
import { createContext, useEffect, useState } from 'react';

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
            localStorage.set("isDarkTheme", `false`);
            setIsDarkTheme(false);
        } else {
            const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
            if (isDarkTheme) {
                document.querySelector("body").classList.add("dark");
            };
            setIsDarkTheme(() => isDarkTheme);
        }
    }

    function toggleThemeHandler() {
        const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
        setIsDarkTheme(!isDarkTheme);
        toggleDarkTheme();
        setValueToLocalStorage();
    }

    function toggleDarkTheme() {
        document.querySelector("body").classList.toggle("dark");    }

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