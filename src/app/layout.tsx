import type { Metadata } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syncopate = Syncopate({ 
  weight: ["400", "700"],
  subsets: ["latin"], 
  variable: "--font-syncopate" 
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
        className={`${inter.variable} ${syncopate.variable} font-sans antialiased bg-[#030303] text-white selection:bg-white selection:text-black`}
      >
        <div className="noise-overlay"></div>
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
