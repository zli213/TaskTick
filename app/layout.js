import dynamic from "next/dynamic";
import "../styles/scss/globals.scss";
import { MyThemeContextProvider } from "../components/application/widgets/MyThemeContext";
import ProviderWrapper from "./ProviderWrapper";

export const metadata = {
  title: "Todo APP",
  description: "Your personal Todo list APP",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <body>
          <ProviderWrapper>
          <MyThemeContextProvider>
            <main>{children}</main>
            </MyThemeContextProvider>
          </ProviderWrapper>
        </body>
      </html>
    
  );
}
