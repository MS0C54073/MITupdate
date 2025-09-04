
'use client';

import * as React from 'react';
import { Layers, Check } from 'lucide-react';
import { useBackgroundTheme, type BackgroundTheme } from '@/app/components/background-theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import TranslatedText from './translated-text';

const themeOptions: { value: BackgroundTheme; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'neural', label: 'Neural Network' },
    { value: 'matrix', label: 'Quantum Matrix' },
    { value: 'circuit', label: 'Circuit Board' },
    { value: 'datacenter', label: 'Data Center' },
];

export function BackgroundThemeToggle() {
  const { theme, setTheme } = useBackgroundTheme();

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Toggle background theme">
                <Layers className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle Background Theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <TranslatedText text="Background Theme" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themeOptions.map((option) => (
                <DropdownMenuItem key={option.value} onSelect={() => setTheme(option.value)}>
                    <div className="flex items-center justify-between w-full">
                        <span><TranslatedText text={option.label} /></span>
                        {theme === option.value && <Check className="h-4 w-4 ml-2" />}
                    </div>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
