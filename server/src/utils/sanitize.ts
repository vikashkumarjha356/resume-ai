/**
 * Sanitizes the raw string response from the AI model.
 * Removes markdown formatting, extra whitespace, and potential trailing characters.
 */
export const sanitizeAIResponse = (response: string): string => {
    // Remove markdown code blocks if present (e.g., ```json ... ```)
    const withoutMarkdown = response.replace(/```json\n?|```/g, '');
    
    // Trim whitespace and potential non-JSON characters at start/end
    const cleaned = withoutMarkdown.trim();
    
    return cleaned;
};
