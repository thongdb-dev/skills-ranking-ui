import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import AppProvider from "@/components/AppProvider";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
        />
      </head>
      <body className="font-sans">
        <AppProvider>
          <AppHeader />
          <div className="mt-[60px]">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
