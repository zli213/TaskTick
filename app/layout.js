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
    <MyThemeContextProvider>

          <html lang="en">
      <body>
        <ProviderWrapper>
          <main>{children}</main>
        </ProviderWrapper>
      </body>
    </html>
    </MyThemeContextProvider>
  );
}
