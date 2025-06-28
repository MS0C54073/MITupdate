'use client';

import * as React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useViewMode } from '@/app/components/view-mode-provider';
import { Button } from '@/components/ui/button';

export function ViewModeToggle() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleViewMode}
      aria-label="Toggle web/mobile view"
    >
      {viewMode === 'web' ? (
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Smartphone className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle web and mobile view</span>
    </Button>
  );
}
