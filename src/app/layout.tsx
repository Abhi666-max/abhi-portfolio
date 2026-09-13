import type { Metadata } from 'next';
import { Inter, Syncopate, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syncopate = Syncopate({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-syncopate' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Portfolio | Cinematic Epic',
  description: 'Creative Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syncopate.variable} ${playfair.variable} bg-black text-white selection:bg-[#c89d70] selection:text-black`}>
        <CustomCursor />
        <Header />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
