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
  targetLanguage: z.enum(['en', 'ru']).describe('The target language.'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  // If the input text is empty or only whitespace, return it directly.
  if (!input.text.trim()) {
    return { translatedText: input.text };
  }
  // If target language is English, and we assume input is English, no translation needed.
  if (input.targetLanguage === 'en') {
     return { translatedText: input.text };
  }
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
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

      if (output && typeof output.translatedText === 'string' && output.translatedText.trim() !== '') {
        return output;
      } else {
        console.warn(
          'Translation prompt did not return expected output structure or returned empty. Input:',
          input,
          'Raw response from prompt:', response
        );
        // Fallback if output structure is not as expected or translated text is empty
        return { translatedText: input.text };
      }
    } catch (error) {
      console.error('Error in translateFlow during prompt execution:', error);
      // Fallback to original text on error
      return { translatedText: input.text };
    }
  }
);
