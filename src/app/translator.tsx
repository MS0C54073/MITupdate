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
  const [sessionTranslationsCache, setSessionTranslationsCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
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

      const cacheKey = englishText; 

      if (sessionTranslationsCache[cacheKey]) {
        return sessionTranslationsCache[cacheKey];
      }

      let docId;
      try {
        docId = await sha256(`${language}_${englishText}`); // Make docId language-specific for cache key
      } catch (e) {
        console.error(`Failed to generate docId for "${englishText}" (lang: ${language}).`, e);
        return englishText; 
      }
      
      const docRef = doc(db, "translations", docId);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // The document ID is now language-specific, so we just need to check for 'translated' field or similar
          // if (data && data[language]) { // This was when docId was only based on englishText
          if (data && data.translatedText) { // Assuming we store the translation in a field named 'translatedText'
            const cachedTranslatedText = data.translatedText as string;
            setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: cachedTranslatedText }));
            return cachedTranslatedText;
          }
        }

        const translateFlowInput: TranslateInput = {
          text: englishText,
          targetLanguage: language,
        };
        const apiResult = await genkitTranslate(translateFlowInput);
        
        if (!apiResult || typeof apiResult.translatedText !== 'string' || apiResult.translatedText.trim() === '') {
          console.warn(
            `Translation API call for "${englishText}" to "${language}" returned invalid, empty, or no translated text. Result:`,
            apiResult,
            'Falling back to English and caching original text for this language key.'
          );
          // Store the original English text as the "translation" for this specific language key if API fails.
          // This prevents repeated failed API calls for the same text-language pair.
          await setDoc(docRef, { 
            originalText: englishText, 
            targetLanguage: language,
            translatedText: englishText, // Store original as fallback
            lastTranslated: serverTimestamp() 
          }, { merge: true });
          setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: englishText }));
          return englishText;
        }
        const apiTranslatedText = apiResult.translatedText;

        const firestoreDataToSet = {
          originalText: englishText,
          targetLanguage: language,
          translatedText: apiTranslatedText,
          lastTranslated: serverTimestamp()
        };
        
        await setDoc(docRef, firestoreDataToSet, { merge: true });

        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: apiTranslatedText }));
        return apiTranslatedText;

      } catch (error) {
        console.error(`Translation process error for "${englishText}" to "${language}" (docId: ${docId}):`, error);
        setSessionTranslationsCache(prev => ({ ...prev, [cacheKey]: englishText }));
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
