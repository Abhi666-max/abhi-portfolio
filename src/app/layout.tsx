import type { Metadata } from 'next';
import './globals.css';
import SpiderCursor from '@/components/SpiderCursor';

export const metadata: Metadata = {
  title: 'Into The Spider-Verse | Portfolio',
  description: 'Extreme Web Slinger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SpiderCursor />
        {children}
      </body>
    </html>
  );
}
