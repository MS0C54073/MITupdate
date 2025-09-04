
'use server';
/**
 * @fileOverview A server-side flow for translating a batch of texts using Google's AI.
 * This is more efficient than sending multiple individual requests.
 *
 * - translateBatch: The main function to translate an array of texts.
 */
import { ai } from '@/ai/ai-instance';
import type {
  TranslateBatchInput,
  TranslateBatchOutput,
} from './translate-batch.types';
import { TranslateBatchOutputSchema } from './translate-batch.types';

/**
 * A server action that translates a batch of texts to a specified language.
 *
 * @param input An object containing the texts array and targetLanguage.
 * @returns A promise that resolves to an object with the translations array.
 */
export async function translateBatch(input: TranslateBatchInput): Promise<TranslateBatchOutput> {
  const { texts, targetLanguage } = input;

  // If there are no texts or the target is English, return the original texts.
  if (!texts || texts.length === 0 || targetLanguage === 'en') {
    return { translations: texts };
  }

  // Create a numbered list of texts for the prompt.
  const numberedTexts = texts.map((text, index) => `${index + 1}. "${text}"`).join('\n');

  try {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: `You are an expert translation engine.
Translate the following numbered list of texts into ${targetLanguage}.
Provide a numbered list of translations that corresponds exactly to the original list.
Return ONLY the translated texts in the 'translations' field, as a JSON array of strings. Do not add extra commentary.
If a text is untranslatable (e.g., a name or code), return it in its original form in the list.

Original Texts:
"""
${numberedTexts}
"""`,
      output: {
        schema: TranslateBatchOutputSchema,
      },
      config: {
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }
    });
    
    const output = response.output;

    // Validate the output structure and length.
    if (output && Array.isArray(output.translations) && output.translations.length === texts.length) {
        return output;
    }

    console.warn('Batch translation returned invalid structure or mismatched length, falling back to original texts.', {
        input,
        response,
    });
    return { translations: texts }; // Fallback for invalid structure

  } catch (error) {
    console.error(
        `Batch translation failed for ${texts.length} texts to "${targetLanguage}". Falling back to original texts.`,
        error
    );
    // On any error, gracefully fall back to the original texts.
    return { translations: texts };
  }
}
