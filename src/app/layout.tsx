import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import PubgCursor from '@/components/PubgCursor';

export const metadata: Metadata = {
  title: 'BATTLEGROUNDS | Portfolio',
  description: 'Winner Winner Chicken Dinner.',
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
          <PubgCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
