/**
 * @fileOverview Type definitions for the translation flow.
 * This file contains the Zod schemas and TypeScript types for the translation function.
 */
import {z} from 'genkit';

// Define the input schema for the translation function
export const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.enum(['en', 'ru']).describe('The target language code (e.g., ru).'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

// Define the output schema for the translation function
export const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;
