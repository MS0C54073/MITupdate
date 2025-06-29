
'use client';

import React from 'react';
import { useTranslation } from '../translator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import {
  RussiaFlagIcon,
  FranceFlagIcon,
  SpainFlagIcon,
  ChinaFlagIcon,
  SaudiArabiaFlagIcon,
  UnitedKingdomFlagIcon,
} from '@/components/flag-icons';

type LanguageCode = 'en' | 'ru' | 'ar' | 'zh' | 'fr' | 'es';

type Language = {
  code: LanguageCode;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const languages: Language[] = [
  { code: 'en', name: 'English', Icon: UnitedKingdomFlagIcon },
  { code: 'es', name: 'Español', Icon: SpainFlagIcon },
  { code: 'fr', name: 'Français', Icon: FranceFlagIcon },
  { code: 'ru', name: 'Русский', Icon: RussiaFlagIcon },
  { code: 'zh', name: '中文', Icon: ChinaFlagIcon },
  { code: 'ar', name: 'العربية', Icon: SaudiArabiaFlagIcon },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between gap-2 w-[150px]">
           <div className="flex items-center gap-2">
            <currentLanguage.Icon className="h-4 w-6 flex-shrink-0" />
            <span className="truncate">{currentLanguage.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <lang.Icon className="h-4 w-6" />
                    <span>{lang.name}</span>
                </div>
              {language === lang.code && <Check className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
