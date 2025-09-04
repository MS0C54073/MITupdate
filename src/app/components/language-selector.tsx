
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../translator';
import { Button } from '@/components/ui/button';
import { RussiaFlagIcon, UnitedKingdomFlagIcon } from '@/components/flag-icons';
import type { LanguageCode } from '../translator';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang: LanguageCode = language === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
  };
  
  if (!isMounted) {
    // Render a placeholder to avoid layout shifts
    return <div className="h-10 w-10" />;
  }

  const Icon = language === 'en' ? UnitedKingdomFlagIcon : RussiaFlagIcon;

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
}
