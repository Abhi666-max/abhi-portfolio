import type { Metadata } from 'next';
import { Inter, Syncopate } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syncopate = Syncopate({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-syncopate' });

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Creative Developer Portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syncopate.variable} bg-black text-white selection:bg-white selection:text-black`}>
        <CustomCursor />
        <Header />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
