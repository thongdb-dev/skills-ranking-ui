import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";
import AppHeader from "@/components/AppHeader";
import AppProvider from "./app";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skills Ranking",
  description: "Skills Ranking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <AppProvider>
          <AppHeader />
          <div>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
