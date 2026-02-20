import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OfferBar from "./component/OfferBar";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { ReduxProvider } from "./store/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop App",
  description: "A premium shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <OfferBar />
        <NavBar />
        {children}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
