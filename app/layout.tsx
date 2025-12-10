import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kiro Instagram',
  description: 'A simple Instagram clone built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
