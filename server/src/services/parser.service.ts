import fs from "fs";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export const parseResume = async (
    filePath: string,
    mimetype: string
) => {
    if (mimetype === "application/pdf") {
        const dataBuffer = fs.readFileSync(filePath);

        const parser = new PDFParse({
            data: dataBuffer
        });

        const result = await parser.getText();

        await parser.destroy();

        return result.text;
    }

    if (
        mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({
            path: filePath
        });

        return result.value;
    }

    throw new Error("Unsupported file type");
};