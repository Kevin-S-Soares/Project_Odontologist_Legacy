import React from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./layout_components/navbar";
import Modal from "./components/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Control Panel",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Modal />
        <Navbar />

        <main className="flex">
          <div className="lg:basis-1/12"></div>
          <div className="grow px-4 pt-5">{children}</div>
          <div className="lg:basis-1/12"></div>
        </main>
        <footer></footer>
      </body>
    </html>
  );
};

export default RootLayout;
