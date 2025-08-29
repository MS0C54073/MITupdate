
'use server';
/**
 * @fileOverview A server-side flow for translating text using Google's AI.
 * This flow is designed to be called securely from the client-side as a Next.js Server Action.
 *
 * - translate: The main function to translate text.
 * - TranslateInput: The Zod schema for the input object.
 * - TranslateOutput: The Zod schema for the output object.
 */

import {z} from 'genkit';
import {ai} from '@/ai/ai-instance';

// Define the input schema for the translation function
export const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.enum(['en', 'ru', 'ar', 'zh', 'fr', 'es']).describe('The target language code (e.g., es, fr, ru).'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

// Define the output schema for the translation function
export const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;


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
  return translateFlow(input);
}


// Define the Genkit prompt for the translation task
const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: { schema: TranslateInputSchema },
  output: { schema: TranslateOutputSchema },
  prompt: `You are an expert translation engine. Your sole task is to translate the given text into {{targetLanguage}}.
Provide only the translated text in the 'translatedText' field. Do not add any extra commentary or explanation.
If the text is untranslatable or nonsensical, return the original text.

Original Text:
"""
{{text}}
"""`,
  // Configure safety settings to block harmful content.
  config: {
    safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  },
});

// Define the Genkit flow that orchestrates the translation
const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input) => {
     try {
        const response = await translatePrompt(input);
        const output = response.output;

        if (output && typeof output.translatedText === 'string') {
            return output;
        }

        console.warn('Translation prompt returned invalid structure, falling back to original text.', { input, response });
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
);
