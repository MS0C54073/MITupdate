
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import TranslatedText from './translated-text';

export function FloatingCalculatorButton() {
  const pathname = usePathname();

  // Don't show the button on the calculator page itself
  if (pathname === '/it-service-calculator') {
    return null;
  }

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50',
      'lg:bottom-8 lg:right-8'
    )}>
      <Button
        asChild
        size="lg"
        className={cn(
          'h-14 w-14 rounded-full p-0 shadow-xl',
          'bg-gradient-to-r from-primary to-accent text-primary-foreground',
          'hover:scale-110 hover:shadow-2xl active:scale-100',
          'transition-all duration-300 ease-in-out',
          'animate-pulse-slow group'
        )}
      >
        <Link href="/it-service-calculator" aria-label="Calculate Project Cost">
          <Calculator className="h-7 w-7 transition-transform duration-300 group-hover:scale-125" />
        </Link>
      </Button>
    </div>
  );
}
