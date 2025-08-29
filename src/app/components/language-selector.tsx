
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '../translator';
import { Button } from '@/components/ui/button';
import { RussiaFlagIcon, UnitedKingdomFlagIcon } from '@/components/flag-icons';
import { ArrowRightLeft } from 'lucide-react';
import TranslatedText from './translated-text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
  };
  
  const currentLanguageDetails = useMemo(() => {
    return language === 'en'
      ? { name: 'English', Icon: UnitedKingdomFlagIcon, nextLang: 'Russian' }
      : { name: 'Русский', Icon: RussiaFlagIcon, nextLang: 'English' };
  }, [language]);


  if (!isMounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <currentLanguageDetails.Icon className="h-6 w-6" />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>
                <TranslatedText text="Switch to " />
                <TranslatedText text={currentLanguageDetails.nextLang} />
            </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
