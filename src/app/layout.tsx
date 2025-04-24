
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ModeToggle} from '@/components/mode-toggle';
import {ThemeProvider} from '@/components/theme-provider';
import {TranslationProvider} from './translator';
import {LanguageSelector} from '@/app/components/language-selector';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Muzo's Niche - Musonda Salimu's Portfolio",
  description:
    'Musonda Salimu (Muzo) - Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover',
  keywords: [
    'Musonda Salimu',
    'Muzo',
    'Tech Enthusiast',
    'English Teacher',
    'Affiliate Marketing',
    'Music',
    'Portfolio',
  ],
  authors: [{name: 'Musonda Salimu'}],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: "Muzo's Niche - Musonda Salimu's Portfolio",
    description:
      'Musonda Salimu (Muzo) - Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover',
    url: 'https://muzosniche.com',
    siteName: "Muzo's Niche",
    images: [
      {
        url: 'https://picsum.photos/1200/630',
        width: 1200,
        height: 630,
        alt: "Muzo's Niche Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Muzo's Niche - Musonda Salimu's Portfolio",
    description:
      'Musonda Salimu (Muzo) - Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover',
    images: ['https://picsum.photos/1200/630'],
    creator: '@MuzoSalimu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationProvider>
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <ModeToggle />
            <LanguageSelector />
          </div>
            {children}
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


