import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { cn } from '@/utils/cn';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Django Mastery Roadmap',
  description: 'Interactive Django and DRF roadmap to strong junior level.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body
        className={cn(outfit.variable, 'font-sans antialiased bg-navy-900 text-slate-100 min-h-screen')}
      >
        <div className="absolute inset-0 z-[-1] bg-grid-pattern opacity-30"></div>
        {children}
      </body>
    </html>
  );
}
