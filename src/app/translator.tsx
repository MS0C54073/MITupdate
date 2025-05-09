'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate as genkitTranslate, TranslateInput } from '@/ai/flows/translate-flow';
import { db } from '@/lib/firebase'; // Import Firestore instance
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Helper function to generate SHA-256 hash for document IDs
async function sha256(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('SHA-256 hashing failed, falling back to plain text (not recommended for all inputs):', error);
    // Fallback for environments where crypto.subtle might not be available (e.g., non-secure contexts)
    // Replace non-alphanumeric characters. This is a basic fallback.
    return message.replace(/[^a-zA-Z0-9]/g, '_') + '_fallback';
  }
}


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

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ru'>('en'); // Default language set to English
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Clear the session cache when the language changes,
    // as cached translations are for the previous language or might be stale.
    setSessionTranslationsCache({});
  }, [language]);

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim()) {
        return '';
      }

      if (language === 'en') {
        return englishText;
      }

      const cacheKey = englishText; // Keyed by the English text

      if (sessionTranslationsCache[cacheKey]) {
        return sessionTranslationsCache[cacheKey];
      }

      let docId;
      try {
        docId = await sha256(englishText);
      } catch (e) {
        console.error(`Failed to generate docId for "${englishText}".`, e);
        return englishText; // Fallback if ID generation fails
      }
      
      const docRef = doc(db, "translations", docId);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data[language]) {
            const cachedTranslatedText = data[language];
            setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }

        const translateFlowInput: TranslateInput = {
          text: englishText,
          targetLanguage: language,
        };
        const apiResult = await genkitTranslate(translateFlowInput);
        
        if (!apiResult || !apiResult.translatedText) {
          console.error(`API call for "${englishText}" to "${language}" returned no translated text. Falling back to English.`);
          return englishText;
        }
        const apiTranslatedText = apiResult.translatedText;

        const firestoreDataToSet: { [key: string]: any } = {
          en: englishText, // Always store/update the original English text
          lastTranslated: serverTimestamp()
        };
        firestoreDataToSet[language] = apiTranslatedText; // Store the new translation
        
        await setDoc(docRef, firestoreDataToSet, { merge: true });

        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: apiTranslatedText }));
        return apiTranslatedText;

      } catch (error) {
        console.error(`Translation process error for "${englishText}" to "${language}" (docId: ${docId}):`, error);
        return englishText; // Fallback to original English text if API call or Firestore operation fails
      }
    },
    [language, sessionTranslationsCache]
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
    
    async function updateTranslation() {
      if (!englishText.trim()) {
        if (isMounted) setTranslatedText('');
        return;
      }
      
      if (currentLanguage === 'en') {
        if (isMounted) setTranslatedText(englishText);
      } else {
        // For other languages, call the translate function.
        const result = await translate(englishText);
        if (isMounted) setTranslatedText(result);
      }
    }
    
    updateTranslation();
    
    return () => {
      isMounted = false;
    };
  }, [englishText, translate, currentLanguage]);

  return translatedText;
};

