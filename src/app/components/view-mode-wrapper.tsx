'use client';

import { useViewMode } from '@/app/components/view-mode-provider';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function ViewModeWrapper({ children }: { children: ReactNode }) {
  const { viewMode } = useViewMode();

  return (
    <div
      className={cn(
        viewMode === 'mobile' && 'view-mode-mobile-simulation'
      )}
    >
      {children}
    </div>
  );
}
