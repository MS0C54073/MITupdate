'use client';

import React from 'react';
import {useTranslation} from '../translator';

export function LanguageSelector() {
  const {language, setLanguage} = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as 'en' | 'ru');
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="ru">Russian</option>
    </select>
  );
}

