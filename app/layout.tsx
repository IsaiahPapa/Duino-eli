import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elijah's Arduino IDE",
  description: "Hoopla!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="cre">
      <body id="ati" className={inter.className + " overflow-hidden"}>{children}</body>
    </html>
  );
}
