import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SwordCursor from '@/components/SwordCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'The Maratha Chronicles | Abhi',
  description: 'A Historic Royal Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${playfair.variable}`}
        style={{
          backgroundColor: '#d7c4a1',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
          color: '#3b2314'
        }}
      >
        <SwordCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
