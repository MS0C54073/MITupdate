'use server';

/**
 * @fileOverview A translation AI agent.
 *
 * - translate - A function that translates text.
 * - TranslateInput - The input type for the translate function.
 * - TranslateOutput - The return type for the translate function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'zod';

const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.enum(['en', 'ru', 'ar', 'zh', 'fr', 'es']).describe('The target language.'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

// The exported function is the public API for the translation flow.
// It handles simple cases and then calls the main flow.
// Errors from translateFlow will propagate up from here.
export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  if (!input.text.trim()) {
    return { translatedText: input.text };
  }
  if (input.targetLanguage === 'en') {
     return { translatedText: input.text };
  }
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {
    schema: TranslateInputSchema,
  },
  output: {
    schema: TranslateOutputSchema,
  },
  prompt: `You are a professional translator. Translate the following text from English to {{targetLanguage}}.
If the text is already in {{targetLanguage}}, return it as is.
If the text cannot be translated or is nonsensical, return the original text.

Original text:
{{text}}

Translated text to {{targetLanguage}}:`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  }
});

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input): Promise<TranslateOutput> => {
    try {
      const response = await prompt(input);
      const output = response.output;

      if (output && typeof output.translatedText === 'string') {
        return output;
      }

      console.warn('Translation prompt returned invalid structure, falling back to original text.', { input, response });
      return { translatedText: input.text }; // Fallback for invalid structure
    } catch (error) {
      console.error(
        `Translation flow failed for text "${input.text}" to "${input.targetLanguage}". This could be due to API rate limits. Falling back to original text.`,
        error
      );
      // On any error (including rate limiting), gracefully fall back to the original text.
      return { translatedText: input.text };
    }
  }
);
