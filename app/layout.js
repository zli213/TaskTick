import "./globals.scss";
import Link from "next/link";

export const metadata = {
  title: "Todo APP",
  description: "Your personal Todo list APP",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/today">Todo List</Link>
          <Link href="/login">Login</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
