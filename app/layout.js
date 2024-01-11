import "../styles/scss/globals.scss";
import { ThemeProvider } from "../components/application/widgets/ThemeProvider";

export const metadata = {
  title: "Todo APP",
  description: "Your personal Todo list APP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
