import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/shared/header/topHeader";
import BottomHeader from "@/components/shared/header/bottomHeader";
import Footer from "@/components/shared/footer/footer";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"], // ✅ Add fallback fonts here
});


export const metadata: Metadata = {
  title: "Innovative Integration",
  description: "Company Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} antialiased`}
      >
        <TopHeader />
        <BottomHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
