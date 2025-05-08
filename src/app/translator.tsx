
'use client';

import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translate as genkitTranslate, TranslateInput } from '@/ai/flows/translate-flow';
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
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
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

      if (language === 'en') {
        return englishText; // No translation needed for English
      }

      // 1. Check session cache
      if (sessionTranslationsCache[englishText]) {
        return sessionTranslationsCache[englishText];
      }

      const docId = await sha256(englishText);
      const docRef = doc(db, "translations", docId);

      try {
        // 2. Check Firestore cache
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data[language]) {
            const cachedTranslatedText = data[language];
            setSessionTranslationsCache(prev => ({ ...prev, [englishText]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }

        // 3. Fetch from Genkit API if not in caches
        // IMPORTANT: This requires GOOGLE_GENAI_API_KEY to be set in your .env file for the Genkit flow.
        const apiResult = await genkitTranslate({
          text: englishText,
          targetLanguage: language,
        });
        const apiTranslatedText = apiResult.translatedText;

        // Store successful translation in Firestore
        // We store the original English text as 'en' for reference, and the target language translation
        const firestoreData: { [key: string]: any } = {
          en: englishText,
          lastTranslated: serverTimestamp()
        };
        firestoreData[language] = apiTranslatedText;
        
        await setDoc(docRef, firestoreData, { merge: true });

        // Update session cache
        setSessionTranslationsCache(prev => ({ ...prev, [englishText]: apiTranslatedText }));
        return apiTranslatedText;

      } catch (error) {
        console.error(`Translation error for "${englishText}" to "${language}":`, error);
        // Fallback to original English text in case of any error (API, Firestore, etc.)
        // Do not cache this fallback in Firestore as a valid translation.
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
  const { translate, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState(englishText);

  useEffect(() => {
    async function updateTranslation() {
      if (!englishText.trim()) {
        setTranslatedText('');
        return;
      }
      // If the current language is English, or if the text is empty,
      // set the translated text to the original English text immediately.
      if (language === 'en') {
        setTranslatedText(englishText);
        return;
      }
      // For other languages, call the translate function which handles caching and API calls.
      const result = await translate(englishText);
      setTranslatedText(result);
    }
    updateTranslation();
  }, [englishText, translate, language]);

  return translatedText;
};
