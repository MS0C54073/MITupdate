
'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate } from '@/ai/flows/translate-flow';
import type { TranslateInput } from '@/ai/flows/translate-flow.types';

type LanguageCode = 'en' | 'ru' | 'ar' | 'zh' | 'fr' | 'es';

interface TranslationContextProps {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
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

// Helper to safely get language from local storage
const getInitialLanguage = (): LanguageCode => {
    if (typeof window === 'undefined') {
        return 'en';
    }
    try {
        const storedLang = localStorage.getItem('user-language');
        if (storedLang && ['en', 'ru', 'ar', 'zh', 'fr', 'es'].includes(storedLang)) {
            return storedLang as LanguageCode;
        }
    } catch (error) {
        console.warn('Could not access local storage for language preference.', error);
    }
    return 'en';
}

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  // Using a Map for the cache is slightly more performant for frequent lookups/updates
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<Map<string, string>>(new Map());
  
  const setLanguage = (newLanguage: LanguageCode) => {
    try {
      localStorage.setItem('user-language', newLanguage);
    } catch (error) {
       console.warn('Could not save language preference to local storage.', error);
    }
    setLanguageState(newLanguage);
    // Clear session cache when language changes
    setSessionTranslationsCache(new Map());
  };

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim() || language === 'en') {
        return englishText;
      }

      const cacheKey = `${language}::${englishText}`;
      if (sessionTranslationsCache.has(cacheKey)) {
        return sessionTranslationsCache.get(cacheKey)!;
      }

      // If not in cache, call the translation function.
      try {
        const translateFlowInput: TranslateInput = {
          text: englishText,
          targetLanguage: language,
        };
        const result = await translate(translateFlowInput);
        
        const translatedText = result.translatedText;

        if (typeof translatedText !== 'string' || !translatedText.trim()) {
          console.warn(`Translation for "${englishText}" to "${language}" returned invalid or empty result. Falling back to original text.`, {result});
          return englishText; // Fallback, do not cache.
        }
        
        // Update session cache with the new translation.
        setSessionTranslationsCache(prevCache => {
            const newCache = new Map(prevCache);
            newCache.set(cacheKey, translatedText);
            return newCache;
        });

        return translatedText;

      } catch (error: any) {
        console.error(
            `TRANSLATION FAILED: Could not translate "${englishText}" to "${language}".`,
            error
        );
        // On any error (including rate limiting), gracefully fall back to the original text.
        return englishText;
      }
    },
    [language, sessionTranslationsCache] // Dependency on cache is correct here
  );

  const value = {
    language,
    setLanguage,
    translate: memoizedTranslate,
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslated = (englishText: string): string => {
  const { translate, language: currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(englishText);

  useEffect(() => {
    let isMounted = true;

    // Immediately reset to English text to avoid showing stale translations
    // when the language or source text changes. This provides instant UI feedback.
    setTranslatedText(englishText);

    if (currentLanguage === 'en') {
      return;
    }

    const doTranslate = async () => {
      if (!englishText.trim()) {
        if (isMounted) setTranslatedText('');
        return;
      }
      
      const result = await translate(englishText);
      if (isMounted) {
        setTranslatedText(result);
      }
    };
    
    doTranslate();
    
    return () => {
      isMounted = false;
    };
  }, [englishText, currentLanguage, translate]);

  return translatedText;
};
