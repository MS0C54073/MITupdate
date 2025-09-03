
'use server';
/**
 * @fileOverview A server-side flow for translating text using Google's AI.
 * This flow is designed to be called securely from the client-side as a Next.js Server Action.
 *
 * - translate: The main function to translate text.
 */
import {ai} from '@/ai/ai-instance';
import type {
  TranslateInput,
  TranslateOutput,
} from './translate-flow.types';
import { z } from 'zod';
import { TranslateOutputSchema } from './translate-flow.types';

/**
 * A server action that translates text to a specified language.
 * It handles edge cases like empty input or translation to English directly.
 * On failure, it gracefully returns the original text.
 *
 * @param input An object containing the text and targetLanguage.
 * @returns A promise that resolves to an object with the translatedText.
 */
export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  // If the input text is empty or the target is English, return the original text to avoid unnecessary API calls.
  if (!input.text.trim() || input.targetLanguage === 'en') {
    return { translatedText: input.text };
  }

   try {
      const response = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: `You are an expert translation engine. Your sole task is to translate the given text into ${input.targetLanguage}.
Provide only the translated text in the 'translatedText' field. Do not add any extra commentary or explanation.
If the text is untranslatable or nonsensical, return the original text.

Original Text:
"""
${input.text}
"""`,
        output: {
          schema: TranslateOutputSchema,
        },
        config: {
          safetySettings: [
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }
      });
      
      const output = response.output;

      if (output && typeof output.translatedText === 'string') {
          return output;
      }

      console.warn('Translation prompt returned invalid structure, falling back to original text.', { input: input, response });
      return { translatedText: input.text }; // Fallback for invalid structure
  } catch (error) {
      console.error(
          `Translation failed for text "${input.text}" to "${input.targetLanguage}". This could be due to API rate limits or service restrictions. Falling back to original text.`,
          error
      );
      // On any error (including rate limiting), gracefully fall back to the original text.
      return { translatedText: input.text };
  }
}
