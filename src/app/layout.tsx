import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import BatCursor from '@/components/BatCursor';

export const metadata: Metadata = {
  title: 'Cricket World Cup | Portfolio',
  description: 'A stadium cinematic portfolio',
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
          <BatCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
