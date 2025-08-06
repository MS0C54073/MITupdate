import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { gemini15Flash } from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  models: [gemini15Flash],
  model: 'googleai/gemini-1.5-flash',
});
