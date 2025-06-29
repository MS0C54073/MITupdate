
import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {ModeToggle} from '@/components/mode-toggle';
import {ThemeProvider} from '@/components/theme-provider';
import {TranslationProvider} from './translator';
import {LanguageSelector} from '@/app/components/language-selector';
import { Toaster } from "@/components/ui/toaster";
import { ViewModeProvider } from '@/app/components/view-mode-provider';
import { ViewModeToggle } from '@/app/components/view-mode-toggle';
import { ViewModeWrapper } from '@/app/components/view-mode-wrapper';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationProvider>
            <ViewModeProvider>
              <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
                <ModeToggle />
                <LanguageSelector />
                <ViewModeToggle />
              </div>
              <ViewModeWrapper>
                {children}
              </ViewModeWrapper>
              <Toaster />
            </ViewModeProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
