import AdmZip from "adm-zip";

/**
 * Decodes XML entities.
 */
function decodeXml(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}

/**
 * Encodes text for XML safety.
 */
function encodeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

/**
 * Normalizes text by removing punctuation, spaces, and converting to lowercase.
 */
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

/**
 * Extracts plain text from a paragraph's inner XML content.
 */
function getParagraphText(pContent: string): string {
    const tRegex = /<w:t\b[^>]*>([^<]*)<\/w:t>/g;
    let match;
    let text = "";
    while ((match = tRegex.exec(pContent)) !== null) {
        text += match[1];
    }
    return decodeXml(text);
}

/**
 * Calculates a match score between the original search text and paragraph text.
 */
function calculateMatchScore(original: string, paragraph: string): number {
    const normalizedOriginal = normalizeText(original);
    const normalizedParagraph = normalizeText(paragraph);

    if (!normalizedOriginal || !normalizedParagraph) return 0;

    // 1. Exact match
    if (normalizedOriginal === normalizedParagraph) {
        return 100;
    }

    // 2. Substring match
    if (normalizedParagraph.includes(normalizedOriginal) || normalizedOriginal.includes(normalizedParagraph)) {
        return 90;
    }

    // 3. Word overlap score
    const wordsOriginal = new Set(original.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const wordsParagraph = new Set(paragraph.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    
    if (wordsOriginal.size === 0) return 0;

    let commonWords = 0;
    for (const word of wordsOriginal) {
        if (wordsParagraph.has(word)) {
            commonWords++;
        }
    }

    return (commonWords / wordsOriginal.size) * 100;
}

interface DocxChange {
    original: string;
    improved: string;
}

/**
 * Patches a .docx file buffer by replacing the specified text chunks.
 */
export const patchDocx = async (
    fileBuffer: Buffer,
    changes: DocxChange[]
): Promise<Buffer> => {
    const zip = new AdmZip(fileBuffer);
    let documentXml = zip.readAsText("word/document.xml");

    // Match all paragraphs in the document XML
    const paragraphRegex = /(<w:p\b[^>]*>)([\s\S]*?)(<\/w:p>)/g;
    const paragraphs: { startTag: string; content: string; endTag: string; index: number; text: string }[] = [];
    
    let match;
    let idx = 0;
    while ((match = paragraphRegex.exec(documentXml)) !== null) {
        const startTag = match[1];
        const content = match[2];
        const endTag = match[3];
        const text = getParagraphText(content);
        paragraphs.push({ startTag, content, endTag, index: idx++, text });
    }

    const replacedIndices = new Set<number>();

    // For each change, find the best matching paragraph in the document
    for (const change of changes) {
        if (!change.original || change.original.trim().length < 10) continue;

        let bestMatchIdx = -1;
        let highestScore = 0;

        for (const p of paragraphs) {
            if (replacedIndices.has(p.index)) continue;

            const score = calculateMatchScore(change.original, p.text);
            if (score > highestScore) {
                highestScore = score;
                bestMatchIdx = p.index;
            }
        }

        // Apply replacement if we have a strong enough match (score >= 60)
        if (bestMatchIdx !== -1 && highestScore >= 60) {
            replacedIndices.add(bestMatchIdx);
            const p = paragraphs[bestMatchIdx];

            // Extract paragraph properties <w:pPr> to preserve styles (lists, headers, formatting)
            const pPrMatch = p.content.match(/<w:pPr\b[^>]*>[\s\S]*?<\/w:pPr>/);
            const pPr = pPrMatch ? pPrMatch[0] : "";

            // Create new text run inside the paragraph
            const newRun = `<w:r><w:t xml:space="preserve">${encodeXml(change.improved)}</w:t></w:r>`;
            const newPContent = pPr + newRun;

            // Reconstruct the paragraph XML
            const originalParagraphXml = p.startTag + p.content + p.endTag;
            const newParagraphXml = p.startTag + newPContent + p.endTag;

            // Replace in documentXml. Since documentXml might have duplicate paragraphs, we replace the first occurrence of the originalParagraphXml
            documentXml = documentXml.replace(originalParagraphXml, newParagraphXml);
        }
    }

    zip.updateFile("word/document.xml", Buffer.from(documentXml, "utf-8"));
    return zip.toBuffer();
};
