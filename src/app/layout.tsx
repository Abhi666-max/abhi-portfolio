import type { Metadata } from "next";
import { Inter, Syncopate, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syncopate = Syncopate({ 
  weight: ["400", "700"],
  subsets: ["latin"], 
  variable: "--font-syncopate" 
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Awwwards Portfolio | Creative Developer",
  description: "High-end Scrollytelling Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={`${inter.variable} ${syncopate.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased bg-[#030303] text-white selection:bg-[#88ccff] selection:text-black`}
      >
        <div className="noise-overlay"></div>
        <LenisProvider>
          <CustomCursor />
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
