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
    return message.replace(/[^a-zA-Z0-9]/g, '_') + '_fallback_sha256_error';
  }
}

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
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Clear session cache when language changes
    setSessionTranslationsCache({});
  }, [language]);

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim() || language === 'en') {
        return englishText;
      }

      const cacheKey = englishText; 
      if (sessionTranslationsCache[cacheKey]) {
        return sessionTranslationsCache[cacheKey];
      }

      let docId;
      try {
        docId = await sha256(`${language}_${englishText}`);
      } catch (e) {
        console.error(`Failed to generate docId for "${englishText}" (lang: ${language}).`, e);
        return englishText; 
      }
      
      const docRef = doc(db, "translations", docId);

      // 1. Check Firestore cache first.
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.translatedText) {
            const cachedTranslatedText = data.translatedText as string;
            setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }
      } catch (error) {
        console.error(`Firestore read error for docId ${docId}. Proceeding to API call.`, error);
      }

      // 2. If not in Firestore, call the translation API.
      try {
        const translateFlowInput: TranslateInput = {
          text: englishText,
          targetLanguage: language,
        };
        const apiResult = await genkitTranslate(translateFlowInput);
        
        const translatedText = apiResult.translatedText;

        if (typeof translatedText !== 'string') {
          console.warn(`Translation for "${englishText}" returned invalid result.`, apiResult);
          return englishText; // Fallback, do not cache.
        }

        // 3. Update caches with the new translation.
        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: translatedText }));
        
        // Asynchronously write to Firestore, don't block returning the translation.
        setDoc(docRef, { 
          originalText: englishText, 
          targetLanguage: language,
          translatedText: translatedText,
          lastTranslated: serverTimestamp() 
        }, { merge: true }).catch(firestoreError => {
          console.error(`Non-blocking Firestore write error for docId ${docId}:`, firestoreError);
        });

        return translatedText;

      } catch (error) {
        console.error(`Translation API process failed for "${englishText}" to "${language}":`, error);
        // On API error, return original text and DO NOT cache the failure.
        return englishText;
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
      
      // The translate function (memoizedTranslate) already handles the "if language is 'en'" case.
      const result = await translate(englishText);
      if (isMounted) {
        setTranslatedText(result);
      }
    }
    
    updateTranslation();
    
    return () => {
      isMounted = false;
    };
  }, [englishText, translate, currentLanguage]);

  return translatedText;
};
