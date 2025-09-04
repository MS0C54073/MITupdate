
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../translator';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import TranslatedText from './translated-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChinaFlagIcon, FranceFlagIcon, RussiaFlagIcon, SaudiArabiaFlagIcon, SpainFlagIcon, UnitedKingdomFlagIcon } from '@/components/flag-icons';

type LanguageOption = {
  code: 'en' | 'ru' | 'es' | 'fr' ;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', Icon: UnitedKingdomFlagIcon },
  { code: 'ru', name: 'Русский', Icon: RussiaFlagIcon },
  { code: 'es', name: 'Español', Icon: SpainFlagIcon },
  { code: 'fr', name: 'Français', Icon: FranceFlagIcon },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLanguageChange = (newLang: 'en' | 'ru' | 'es' | 'fr') => {
    setLanguage(newLang);
  };
  
  if (!isMounted) {
    return <div className="h-10 w-10" />;
  }

  const CurrentIcon = languageOptions.find(opt => opt.code === language)?.Icon || Languages;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Toggle language"
        >
          <CurrentIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel><TranslatedText text="Select Language"/></DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onSelect={() => handleLanguageChange(option.code)}
            className="cursor-pointer"
          >
            <option.Icon className="h-4 w-5 mr-2" />
            <span><TranslatedText text={option.name}/></span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
