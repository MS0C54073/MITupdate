
'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate as genkitTranslate } from '@/ai/flows/translate-flow';
import { db } from '@/lib/firebase'; // Import Firestore instance
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

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
    // Fallback for environments where crypto.subtle might not be available or working as expected (e.g. non-secure contexts for some browsers)
    // This is a simple fallback and might not be suitable for all text inputs as Firestore document IDs have restrictions.
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
  // Session cache: stores translations for the current session and language
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Clear session cache when language changes
    setSessionTranslationsCache({});
  }, [language]);

  const memoizedTranslate = useCallback(
    async (englishText: string): Promise<string> => {
      if (!englishText.trim()) {
        return '';
      }

      // If the target language is English, and the original text is already English, return it.
      // This also handles the case where the original text might be Russian and we want to translate it to English.
      if (language === 'en') {
        // Potentially, if we expect non-English source text to be translated to English,
        // we might need to check if `englishText` is actually English.
        // For now, assuming `englishText` is the key and if target is 'en', it's the desired output.
        // This needs to be robust if original texts can be in Russian.
        // For this iteration, if the target is 'en', we assume the input `englishText` is the desired output
        // or it needs to be translated TO English if it's not already.
        // The current Genkit flow assumes input `text` is to be translated.
        // If `englishText` is actually Russian and `language` is 'en', we need to translate.
      }


      // 1. Check session cache
      // The cache key should be consistent, e.g., always the English version of the text.
      // For simplicity, using `englishText` as key. If `englishText` can be Russian, this needs refinement.
      const cacheKey = englishText; // Assuming `englishText` is the canonical English version.
      if (sessionTranslationsCache[cacheKey] && language !== 'en') { // Only use cache if not translating to English (as English is source)
         return sessionTranslationsCache[cacheKey];
      }
       if (language === 'en') { // If target is English, just return the input (assuming it's English)
        return englishText;
      }


      const docId = await sha256(englishText); // Firestore doc ID based on English text
      const docRef = doc(db, "translations", docId);

      try {
        // 2. Check Firestore cache
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data[language]) { // Check if translation for the current target language exists
            const cachedTranslatedText = data[language];
            setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }

        // 3. Fetch from Genkit API if not in caches
        const apiResult = await genkitTranslate({
          text: englishText, // Source text to translate
          targetLanguage: language, // Target language
        });
        const apiTranslatedText = apiResult.translatedText;

        // Store successful translation in Firestore
        const firestoreData: { [key: string]: any } = {
          en: englishText, // Store the original English text
          lastTranslated: serverTimestamp()
        };
        firestoreData[language] = apiTranslatedText; // Store the translation for the target language
        
        await setDoc(docRef, firestoreData, { merge: true });

        // Update session cache
        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: apiTranslatedText }));
        return apiTranslatedText;

      } catch (error) {
        console.error(`Translation error for "${englishText}" to "${language}":`, error);
        return englishText; // Fallback to original English text
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
  const { translate, language: currentLanguage } = useTranslation(); // Renamed to currentLanguage to avoid conflict
  const [translatedText, setTranslatedText] = useState(englishText);

  useEffect(() => {
    async function updateTranslation() {
      if (!englishText.trim()) {
        setTranslatedText('');
        return;
      }
      // If the current language is English, set the translated text to the original English text.
      if (currentLanguage === 'en') {
        setTranslatedText(englishText);
        return;
      }
      // For other languages (e.g., Russian), call the translate function.
      const result = await translate(englishText);
      setTranslatedText(result);
    }
    updateTranslation();
  }, [englishText, translate, currentLanguage]); // Added currentLanguage to dependencies

  return translatedText;
};

