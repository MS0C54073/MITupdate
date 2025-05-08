
'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate as genkitTranslate } from '@/ai/flows/translate-flow';
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
    return message.replace(/[^a-zA-Z0-9]/g, '_'); // Basic sanitization
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
  const [language, setLanguage] = useState<'en' | 'ru'>('ru'); // Default language set to Russian
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setSessionTranslationsCache({});
  }, [language]);

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim()) {
        return '';
      }

      // If the target language is English, no translation is needed.
      // `englishText` is assumed to be the canonical English version.
      if (language === 'en') {
        return englishText;
      }

      // For non-English target languages (e.g., 'ru'):
      const cacheKey = englishText; // Keyed by the English text

      // 1. Check session cache for the translation to the current `language`
      if (sessionTranslationsCache[cacheKey]) {
         return sessionTranslationsCache[cacheKey];
      }

      const docId = await sha256(englishText); // Firestore doc ID based on English text
      const docRef = doc(db, "translations", docId);

      try {
        // 2. Check Firestore cache
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Check if translation for the current target language exists in Firestore
          if (data && data[language]) {
            const cachedTranslatedText = data[language];
            // Update session cache
            setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }

        // 3. Fetch from Genkit API if not in caches or Firestore for the target language
        console.log(`TRANSLATOR_DEBUG: Attempting to translate "${englishText}" to "${language}" via API.`);
        const apiResult = await genkitTranslate({
          text: englishText,       // Source text to translate (always English)
          targetLanguage: language, // Target language (e.g., 'ru')
        });
        
        if (!apiResult || !apiResult.translatedText) {
          console.error(`TRANSLATOR_DEBUG: API call for "${englishText}" to "${language}" returned no translated text. Fallback to English.`);
          return englishText;
        }
        const apiTranslatedText = apiResult.translatedText;
        console.log(`TRANSLATOR_DEBUG: API translation for "${englishText}" to "${language}" SUCCESS: "${apiTranslatedText}"`);

        // Store successful translation in Firestore
        // Ensure Firestore data includes the English text and the new translation
        const firestoreDataToSet: { [key: string]: any } = {
          en: englishText, // Store/update the original English text
          lastTranslated: serverTimestamp() // Firestore server timestamp
        };
        firestoreDataToSet[language] = apiTranslatedText; // Store the translation for the target language
        
        await setDoc(docRef, firestoreDataToSet, { merge: true });
        console.log(`TRANSLATOR_DEBUG: Stored translation for "${englishText}" to "${language}" in Firestore.`);

        // Update session cache
        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: apiTranslatedText }));
        return apiTranslatedText;

      } catch (error) {
        console.error(`TRANSLATOR_DEBUG: Translation error for "${englishText}" to "${language}":`, error);
        // Fallback to original English text if API call or Firestore operation fails
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
      
      if (currentLanguage === 'en') {
        if (isMounted) setTranslatedText(englishText);
      } else {
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

