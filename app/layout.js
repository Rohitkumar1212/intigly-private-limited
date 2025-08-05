import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokemon app",
  description: "Discover amazing world of pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="bg-purple-400">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
