import { sanitizeAIResponse } from './sanitize';
import { validateAIResponse, ResumeAnalysis } from './validation';

/**
 * Orchestrates the cleanup, parsing, and validation of AI responses.
 * Provides a safe flow with error handling.
 */
export const parseAIResponse = (rawResponse: string): ResumeAnalysis => {
    try {
        const sanitized = sanitizeAIResponse(rawResponse);
        const parsed = JSON.parse(sanitized);
        return validateAIResponse(parsed);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse AI response as JSON: ${error.message}`);
        }
        if (error instanceof Error) {
            throw new Error(`AI response validation failed: ${error.message}`);
        }
        throw new Error('An unknown error occurred while processing the AI response.');
    }
};
