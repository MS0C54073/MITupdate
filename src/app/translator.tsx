
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translateBatch } from '@/ai/flows/translate-batch-flow';
import type { TranslateBatchInput } from '@/ai/flows/translate-batch.types';

type LanguageCode = 'en' | 'ru';

// A Set is used to efficiently track unique strings that need translation.
type TranslationRequestContext = Set<string>;

interface TranslationContextProps {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translations: Map<string, string>; // Cache for translated text
  requestTranslation: (text: string) => void; // Function for components to register text
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
        if (storedLang && ['en', 'ru'].includes(storedLang)) {
            return storedLang as LanguageCode;
        }
    } catch (error) {
        console.warn('Could not access local storage for language preference.', error);
    }
    return 'en';
}

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());
  const [translationRequestQueue, setTranslationRequestQueue] = useState<TranslationRequestContext>(new Set());

  // Function for components to register their text
  const requestTranslation = useCallback((text: string) => {
    if (text && language !== 'en' && !translations.has(text)) {
      setTranslationRequestQueue(prev => new Set(prev).add(text));
    }
  }, [language, translations]);

  const setLanguage = (newLanguage: LanguageCode) => {
    try {
      localStorage.setItem('user-language', newLanguage);
    } catch (error) {
       console.warn('Could not save language preference to local storage.', error);
    }
    setLanguageState(newLanguage);
    // Clear cache and request queue on language change
    setTranslations(new Map());
    setTranslationRequestQueue(new Set());
  };

  useEffect(() => {
    if (language === 'en') {
      setTranslations(new Map()); // Clear translations if language is English
      return;
    }

    if (translationRequestQueue.size === 0) {
      return;
    }
    
    // Create a snapshot of the current queue for processing.
    const textsToTranslate = Array.from(translationRequestQueue);
    
    // Clear the queue immediately after capturing the texts.
    setTranslationRequestQueue(new Set());
    
    const performBatchTranslation = async () => {
      try {
        const input: TranslateBatchInput = {
          texts: textsToTranslate,
          targetLanguage: language,
        };
        const result = await translateBatch(input);
        
        // Update the central cache with all the new translations
        setTranslations(prev => {
          const newTranslations = new Map(prev);
          result.translations.forEach((translatedText, i) => {
            newTranslations.set(textsToTranslate[i], translatedText);
          });
          return newTranslations;
        });

      } catch (error) {
        console.error("Batch translation failed:", error);
        // In case of a batch failure, we don't update the cache.
        // The original text will be shown as a fallback.
      }
    };

    // Debounce the call to avoid rapid-fire requests
    const timer = setTimeout(performBatchTranslation, 50);

    return () => clearTimeout(timer);

  }, [language, translationRequestQueue]);

  const contextValue = {
    language,
    setLanguage,
    translations,
    requestTranslation,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslatedText = (text: string): string => {
  const { translations, requestTranslation, language } = useTranslation();

  useEffect(() => {
    // Register the text for translation when the component mounts or text changes
    if (text) {
      requestTranslation(text);
    }
  }, [text, requestTranslation]);

  if (language === 'en') {
    return text;
  }
  
  // Return the translated text from the central cache, or the original text as a fallback.
  return translations.get(text) || text;
};
