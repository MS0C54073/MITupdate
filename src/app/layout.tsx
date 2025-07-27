
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
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Muzo Salimu - Personal Portfolio",
  description:
    'Muzo Salimu - Software Engineer, Tech Enthusiast, and Educator',
  keywords: [
    'Muzo Salimu',
    'Software Engineer',
    'Portfolio',
    'React Developer',
    'Next.js',
    'TypeScript'
  ],
  authors: [{name: 'Muzo Salimu'}],
  openGraph: {
    title: "Muzo Salimu - Personal Portfolio",
    description:
      'Muzo Salimu - Software Engineer, Tech Enthusiast, and Educator',
    url: 'https://muzosniche.com',
    siteName: "Muzo Salimu's Portfolio",
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: "Muzo Salimu's Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Muzo Salimu - Personal Portfolio",
    description:
      'Muzo Salimu - Software Engineer, Tech Enthusiast, and Educator',
    images: ['https://placehold.co/1200x630.png'],
    creator: '@MuzoSalim',
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


const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#skills', text: 'Skills' },
    { href: '#projects', text: 'Projects' },
    { href: '#experience', text: 'Experience' },
    { href: '#education', text: 'Education' },
    { href: '#contact', text: 'Contact' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
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
                  
                  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                        <Link href="/" className="h-12 w-12 transition-transform hover:scale-110" aria-label="Go to homepage">
                            <MuzoInTechLogo />
                        </Link>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map(link => (
                                <Button key={link.href} variant="link" asChild>
                                    <Link href={link.href} className="text-sm font-medium hover:text-primary">
                                        <TranslatedText text={link.text} />
                                    </Link>
                                </Button>
                            ))}
                        </nav>

                        {/* Mobile Nav */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <nav className="flex flex-col gap-4 mt-8">
                                        {navLinks.map(link => (
                                            <SheetTrigger asChild key={link.href}>
                                                <Link href={link.href} className="text-lg font-medium hover:text-primary">
                                                    <TranslatedText text={link.text} />
                                                </Link>
                                            </SheetTrigger>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                         <div className="hidden md:flex items-center gap-2">
                            <LanguageSelector />
                            <ModeToggle />
                        </div>
                    </div>
                  </header>
                  
                  <div className="fixed top-24 right-4 z-50 flex flex-col items-end space-y-2 md:hidden">
                    <LanguageSelector />
                    <ModeToggle />
                    <ViewModeToggle />
                    <BackgroundThemeToggle />
                  </div>

                  <ViewModeWrapper>
                    <main className="pt-20">
                        {children}
                    </main>
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
