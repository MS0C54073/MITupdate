
'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate as genkitTranslate, TranslateInput } from '@/ai/flows/translate-flow';

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

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');
  // Using a Map for the cache is slightly more performant for frequent lookups/updates
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // Clear session cache when language changes
    setSessionTranslationsCache(new Map());
  }, [language]);

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim() || language === 'en') {
        return englishText;
      }

      const cacheKey = `${language}::${englishText}`;
      if (sessionTranslationsCache.has(cacheKey)) {
        return sessionTranslationsCache.get(cacheKey)!;
      }

      // If not in cache, call the translation API.
      try {
        const translateFlowInput: TranslateInput = {
          text: englishText,
          targetLanguage: language,
        };
        const apiResult = await genkitTranslate(translateFlowInput);
        
        const translatedText = apiResult.translatedText;

        if (typeof translatedText !== 'string' || !translatedText.trim()) {
          console.warn(`Translation for "${englishText}" to "${language}" returned invalid or empty result. Falling back to original text.`, {apiResult});
          return englishText; // Fallback, do not cache.
        }

        // Update session cache with the new translation.
        setSessionTranslationsCache(prevCache => {
            const newCache = new Map(prevCache);
            newCache.set(cacheKey, translatedText);
            return newCache;
        });

        return translatedText;

      } catch (error) {
        // This is a critical error path. Most likely, the GOOGLE_GENAI_API_KEY is not set correctly
        // in the .env file, or the associated Google Cloud project does not have billing enabled.
        console.error(
            `TRANSLATION FAILED: Could not translate "${englishText}" to "${language}". ` +
            `This is likely due to an API key or billing issue. ` +
            `Please check your .env file and Google Cloud project configuration.`,
            error
        );
        // On API error, return original text and DO NOT cache the failure.
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
