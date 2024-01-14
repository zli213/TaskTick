import dynamic from "next/dynamic";
import "../styles/scss/globals.scss";
import { ThemeProvider } from "next-themes";

import ProviderWrapper from "./ProviderWrapper";
export const metadata = {
  title: "Todo APP",
  description: "Your personal Todo list APP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
      <body>
          <main>{children}</main>
        <ProviderWrapper>
          <main>{children}</main>
        </ProviderWrapper>
      </body>
      </ThemeProvider>
    </html>
  );
}
