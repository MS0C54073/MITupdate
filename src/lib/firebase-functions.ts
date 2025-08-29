
'use server';

import { z } from 'zod';
import { ai } from '@/ai/ai-instance';

const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.enum(['en', 'ru', 'ar', 'zh', 'fr', 'es']).describe('The target language.'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

// This is an server-side action that can be securely called from the client
export async function translateText(input: TranslateInput): Promise<TranslateOutput> {
  // Handle simple cases on the server to avoid unnecessary API calls
  if (!input.text.trim() || input.targetLanguage === 'en') {
    return { translatedText: input.text };
  }

  const prompt = ai.definePrompt({
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
    config: {
      safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    },
  });

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
      `Translation failed for text "${input.text}" to "${input.targetLanguage}". This could be due to API rate limits or service restrictions. Falling back to original text.`,
      error
    );
    // On any error (including rate limiting), gracefully fall back to the original text.
    return { translatedText: input.text };
  }
}
