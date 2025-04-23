'use client';

import React, {useState, createContext, useContext, ReactNode, useEffect} from 'react';
import {translate, TranslateInput} from '@/ai/flows/translate-flow';

interface TranslationContextProps {
  language: 'en' | 'ru';
  setLanguage: (language: 'en' | 'ru') => void;
  translate: (text: string) => Promise<string>;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({children}) => {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [translations, setTranslations] = useState<{[key: string]: string}>({});

  const memoizedTranslate = React.useCallback(
    async (text: string) => {
      if (!text) {
        return '';
      }
      if (translations[text]) {
        return translations[text];
      }

      try {
        const result = await translate({
          text: text,
          targetLanguage: language,
        } as TranslateInput);

        setTranslations(prevTranslations => ({
          ...prevTranslations,
          [text]: result.translatedText,
        }));
        return result.translatedText;
      } catch (error) {
        console.error('Translation error:', error);
        return text;
      }
    },
    [language, translations]
  );

  const value = {
    language,
    setLanguage,
    translate: memoizedTranslate,
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

// Usage hook for components that need translation
export const useTranslated = (text: string): string => {
  const {translate} = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    async function updateTranslation() {
      const result = await translate(text);
      setTranslatedText(result);
    }
    updateTranslation();
  }, [text, translate]);

  return translatedText;
};

