/* eslint-disable @next/next/no-sync-scripts */

import Navbar from "@/components/Navbar/Navbar";
import { ChatContextProvider } from "@/context/ChatContext";
import Providers from "@/provider";
import Authprovider2 from "@/provider/AuthProvider2";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "./ThemeProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	  title: "PicxaBee | DevDynamos",

	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body className={`${inter.className}`}>
        <Providers>
          <Authprovider2>
            <ChatContextProvider>
             <ThemeProviders>
             <div className="">
             {/* <Navbar /> */}
              <div className="dark:text-white dark:bg-zinc-800">{children}</div>
             </div>
             </ThemeProviders>
            </ChatContextProvider>
          </Authprovider2>
        </Providers>
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script>AOS.init();</script>
      </body>
    </html>
  );
}
