"use client";
import { SessionProvider } from "next-auth/react";

export default function ProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
