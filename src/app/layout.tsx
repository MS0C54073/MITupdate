
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
import { BackgroundThemeProvider } from './components/background-theme-provider';
import { BackgroundThemeToggle } from './components/background-theme-toggle';
import { DynamicBackground } from './components/dynamic-background';
import { AuthProvider } from './auth-context';
import AuthNav from './components/auth-nav';
import Link from 'next/link';
import { MuzoInTechLogo } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';
import TranslatedText from './components/translated-text';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Muzo's Niche - Portfolio",
  description:
    'Muzo - Tech Enthusiast, Tutor, Affiliate Marketer, and Music Lover',
  keywords: [
    'Muzo',
    'Tech Enthusiast',
    'Tutor',
    'Affiliate Marketing',
    'Music',
    'Portfolio',
  ],
  authors: [{name: 'Muzo'}],
  openGraph: {
    title: "Muzo's Niche - Portfolio",
    description:
      'Muzo - Tech Enthusiast, Tutor, Affiliate Marketer, and Music Lover',
    url: 'https://muzosniche.com',
    siteName: "Muzo's Niche",
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
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
    title: "Muzo's Niche - Portfolio",
    description:
      'Muzo - Tech Enthusiast, Tutor, Affiliate Marketer, and Music Lover',
    images: ['https://placehold.co/1200x630.png'],
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
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TranslationProvider>
            <AuthProvider>
              <BackgroundThemeProvider>
                <ViewModeProvider>
                  <DynamicBackground />
                  <Link href="/" className="fixed top-4 left-4 z-50 h-12 w-12 transition-transform hover:scale-110" aria-label="Go to homepage">
                    <MuzoInTechLogo />
                  </Link>
                  <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
                    <div className="flex items-center gap-2">
                      <AuthNav />
                      <ModeToggle />
                    </div>
                    <LanguageSelector />
                    <ViewModeToggle />
                    <BackgroundThemeToggle />
                  </div>
                  <ViewModeWrapper>
                    <Alert variant="destructive" className="container mx-auto mt-20 mb-[-2.5rem]">
                        <Construction className="h-4 w-4" />
                        <AlertTitle className="font-bold text-lg">
                            <TranslatedText text="Under Maintenance!!!" />
                        </AlertTitle>
                        <AlertDescription className="font-bold text-base">
                            <TranslatedText text="This site is currently undergoing updates and many functions are not working. For assistance, please click a social media icon to contact us!!!" />
                        </AlertDescription>
                    </Alert>
                    {children}
                  </ViewModeWrapper>
                  <Toaster />
                </ViewModeProvider>
              </BackgroundThemeProvider>
            </AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
