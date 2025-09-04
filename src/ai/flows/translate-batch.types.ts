
/**
 * @fileOverview Type definitions for the batch translation flow.
 */
import {z} from 'genkit';

// Define the input schema for the batch translation function
export const TranslateBatchInputSchema = z.object({
  texts: z.array(z.string()).describe('The texts to translate.'),
  targetLanguage: z.enum(['en', 'ru']).describe('The target language code (e.g., ru).'),
});
export type TranslateBatchInput = z.infer<typeof TranslateBatchInputSchema>;

// Define the output schema for the batch translation function
export const TranslateBatchOutputSchema = z.object({
  translations: z.array(z.string()).describe('The array of translated texts.'),
});
export type TranslateBatchOutput = z.infer<typeof TranslateBatchOutputSchema>;
