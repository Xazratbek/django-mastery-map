import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import './globals.css';
import { cn } from '@/utils/cn';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Django & DRF Mastery Roadmap - 0 dan Juniorgacha',
  description: 'Django va Django REST Framework ni professional tarzda o\'rganish uchun eng aniq va interaktiv roadmap. Backend architecture, PostgreSQL va DB mantiqlarga to\'liq fokus.',
  keywords: ['Django', 'Python', 'Roadmap', 'Backend', 'DRF', 'Django REST Framework', 'O\'zbek tilida'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Django Mastery Roadmap | O\'zbek tilida',
    description: '1 oylik reja bilan Djangodan strong junior darajasiga chiqing. Interaktiv metodika va real backend bazaviy shartlari bilan.',
    type: 'website',
    locale: 'uz_UZ',
    siteName: 'Django Roadmap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Django Mastery Roadmap',
    description: 'Djangoni backend framework sifatida professional o\'rganing.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={cn(
          fraunces.variable,
          spaceGrotesk.variable,
          'font-sans antialiased bg-[var(--bg)] text-[var(--fg)] min-h-screen'
        )}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
