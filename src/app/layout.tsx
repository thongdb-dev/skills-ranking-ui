import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import AppHeader from "@/components/AppHeader";
import AppProvider from "@/components/AppProvider";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

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
          <div className="mt-[60px]">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
