import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import LuxuryCursor from '@/components/LuxuryCursor';

export const metadata: Metadata = {
  title: 'Abhijit | Creative Developer',
  description: 'Crafting digital experiences with precision.',
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
          <LuxuryCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
