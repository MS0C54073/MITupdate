
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
      'fixed bottom-6 right-6 z-50 group',
      'lg:bottom-8 lg:right-8'
    )}>
      <Button
        asChild
        size="lg"
        className={cn(
          'h-14 rounded-full shadow-xl overflow-hidden',
          'bg-gradient-to-r from-primary to-accent text-primary-foreground',
          'hover:shadow-2xl active:scale-95',
          'transition-all duration-300 ease-in-out',
          'w-14 group-hover:w-64' // Expand width on hover
        )}
      >
        <Link href="/it-service-calculator" aria-label="Calculate Project Cost" className="flex items-center justify-start pl-3.5">
          <Calculator className="h-7 w-7 flex-shrink-0" />
          <span className="whitespace-nowrap pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-150">
              <TranslatedText text="Calculate My Project Cost" />
          </span>
        </Link>
      </Button>
    </div>
  );
}
