import dynamic from "next/dynamic";
import StoreProvider from "../store/StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import "../styles/scss/globals.scss";
import ProviderWrapper from "./ProviderWrapper";
export const metadata = {
  title: "Todo APP",
  description: "Your personal Todo list APP",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ProviderWrapper>
            <main>{children}</main>
          </ProviderWrapper>
        </body>
      </html>
    </StoreProvider>
  );
}
