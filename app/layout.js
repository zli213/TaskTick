import dynamic from "next/dynamic";
import StoreProvider from "../store/StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import "../styles/scss/globals.scss";
import { MyThemeContextProvider } from "../components/application/widgets/MyThemeContext";
import ProviderWrapper from "./ProviderWrapper";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export const metadata = {
  title: "TaskTick",
  description: "Your personal Todo list APP",
};

export default function RootLayout({ children }) {
  const themeName = getCookie("themeName", { cookies });
  const systemTheme = getCookie("systemTheme", { cookies });

  
  const styleName = themeName === "system" ? systemTheme : themeName;
  return (
    <StoreProvider>
      <ProviderWrapper>
        <MyThemeContextProvider>
          <html lang="en" className={ styleName }>
            <body>
              <main>{children}</main>
            </body>
          </html>
        </MyThemeContextProvider>
      </ProviderWrapper>
    </StoreProvider>
  );
}
