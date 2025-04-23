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
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The text to translate.'),
      targetLanguage: z.enum(['en', 'ru']).describe('The target language.'),
    }),
  },
  output: {
    schema: z.object({
      translatedText: z.string().describe('The translated text.'),
    }),
  },
  prompt: `You are a professional translator, fluent in English and Russian.

Translate the following text to {{targetLanguage}}:

{{text}}`,
});

const translateFlow = ai.defineFlow<typeof TranslateInputSchema, typeof TranslateOutputSchema>(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
