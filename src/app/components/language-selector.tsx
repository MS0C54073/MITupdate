
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../translator';
import { Button } from '@/components/ui/button';
import TranslatedText from './translated-text';

type LanguageCode = 'en' | 'ru' | 'ar' | 'zh' | 'fr' | 'es';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  // Local buffer for language selection before applying
  const [selectedLanguageBuffer, setSelectedLanguageBuffer] = useState<LanguageCode>(language);

  // Update buffer when the global language changes (e.g., initial load)
  useEffect(() => {
    setSelectedLanguageBuffer(language);
  }, [language]);

  const handleLanguageBufferChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguageBuffer(event.target.value as LanguageCode);
  };

  const handleApplyTranslation = () => {
    setLanguage(selectedLanguageBuffer);
  };

  return (
    <div className="flex flex-col items-end space-y-2 p-1 bg-card/80 backdrop-blur-sm rounded-md shadow-md">
      <select 
        value={selectedLanguageBuffer} 
        onChange={handleLanguageBufferChange}
        className="p-2 border border-border rounded-md bg-background text-foreground focus:ring-primary focus:border-primary text-sm"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="ru">Русский (Russian)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="zh">中文 (Chinese)</option>
        <option value="fr">Français (French)</option>
        <option value="es">Español (Spanish)</option>
      </select>
      <Button 
        onClick={handleApplyTranslation} 
        variant="outline" 
        size="sm"
        className="w-full"
        disabled={selectedLanguageBuffer === language}
      >
        <TranslatedText text="Translate" />
      </Button>
    </div>
  );
}
