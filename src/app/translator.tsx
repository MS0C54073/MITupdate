'use client';

import React, {useState, createContext, useContext, ReactNode, useEffect, useCallback} from 'react';
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

  useEffect(() => {
    // Clear translations cache when language changes
    setTranslations({});
  }, [language]);

  const memoizedTranslate = useCallback(
    async (text: string) => {
      if (!text.trim()) { // Do not translate empty or whitespace-only strings
        return '';
      }
      // If the text is already translated to the current language, return it from cache
      // This assumes cache keys are unique enough or we rely on the language change to clear the cache.
      // For a more robust cache, keys could be `text-${language}`.
      // However, with the useEffect clearing cache on language change, this simple keying is okay.
      if (translations[text]) {
        return translations[text];
      }

      try {
        // If current language is English, no need to translate
        if (language === 'en') {
          setTranslations(prevTranslations => ({
            ...prevTranslations,
            [text]: text,
          }));
          return text;
        }

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
        // Fallback to original text in case of error
        return text;
      }
    },
    [language, translations] // translations dependency is important for the caching logic
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
  const {translate, language} = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    async function updateTranslation() {
      if (!text.trim()) {
        setTranslatedText('');
        return;
      }
      // When language is English, use original text immediately
      if (language === 'en') {
        setTranslatedText(text);
        return;
      }
      const result = await translate(text);
      setTranslatedText(result);
    }
    updateTranslation();
  }, [text, translate, language]); // Ensure language is a dependency

  return translatedText;
};
