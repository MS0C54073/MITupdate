
'use server';
/**
 * @fileOverview A test script for the translate-flow.
 * This script can be run directly to verify the functionality of the translate function.
 * 
 * To run:
 * 1. Ensure your .env file has a valid GOOGLE_GENAI_API_KEY.
 * 2. Run the command: `npx tsx src/ai/flows/__tests__/translate-flow.test.ts`
 */

import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env file at the project root
config({ path: path.resolve(process.cwd(), '.env') });

import { translate } from '../translate-flow';

// Simple assertion helper
function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

async function runTests() {
    let passed = 0;
    let failed = 0;

    const tests: { name: string; fn: () => Promise<void> }[] = [
        {
            name: 'should translate English to Spanish',
            async fn() {
                const input = { text: 'Hello, world!', targetLanguage: 'es' as const };
                const expected = 'Hola, mundo!';
                const result = await translate(input);
                // We check for inclusion because the model might add punctuation.
                assert(
                    result.translatedText.toLowerCase().includes(expected.toLowerCase().replace('!', '')),
                    `Expected something like "${expected}", but got "${result.translatedText}"`
                );
            }
        },
        {
            name: 'should return original text if target language is English',
            async fn() {
                const input = { text: 'This is already English.', targetLanguage: 'en' as const };
                const result = await translate(input);
                assert(
                    result.translatedText === input.text,
                    `Expected "${input.text}", but got "${result.translatedText}"`
                );
            }
        },
        {
            name: 'should return original text for empty input',
            async fn() {
                const input = { text: ' ', targetLanguage: 'es' as const };
                const result = await translate(input);
                assert(
                    result.translatedText === input.text,
                    `Expected empty text, but got "${result.translatedText}"`
                );
            }
        },
        {
            name: 'should handle a different language (French)',
            async fn() {
                const input = { text: 'Good morning', targetLanguage: 'fr' as const };
                const expected = 'Bonjour';
                const result = await translate(input);
                 assert(
                    result.translatedText.toLowerCase().includes(expected.toLowerCase()),
                    `Expected something like "${expected}", but got "${result.translatedText}"`
                );
            }
        }
    ];

    console.log('--- Running Translation Flow Tests ---');
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        console.error('\n❌ ERROR: GOOGLE_GENAI_API_KEY is not set in your .env file.');
        console.log('Please set it up to run these tests.');
        return;
    }
    
    for (const test of tests) {
        try {
            await test.fn();
            console.log(`✅ PASS: ${test.name}`);
            passed++;
        } catch (error) {
            console.error(`❌ FAIL: ${test.name}`);
            if (error instanceof Error) {
                console.error(`   ${error.message}`);
            } else {
                 console.error('   An unknown error occurred');
            }
            failed++;
        }
    }

    console.log('\n--- Test Summary ---');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log('--------------------');

    if (failed > 0) {
        process.exit(1); // Exit with a failure code
    }
}

runTests();
