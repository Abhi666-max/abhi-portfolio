import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'Anime Studio | Portfolio',
  description: 'Manga Aesthetic Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
