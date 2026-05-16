import { Request, Response } from "express";
import { parseResume } from "../services/parser.service";
import { analyzeResumeWithAI } from "../services/gemini.service";
import { createAuthorizedClient } from "../config/supabase";
import fs from "fs/promises";

export const analyzeResume = async (
    req: Request,
    res: Response
) => {
    const file = req.file;
    try {
        console.log("REQUEST HIT");
        const { jobDescription } = req.body;

        if (!file) {
            res.status(400).json({
                message: "Resume file missing"
            });
            return;
        }

        const resumeText = await parseResume(
            file.path,
            file.mimetype
        );

        // Call Gemini service (now handles parsing, validation, and retries)
        const analysis = await analyzeResumeWithAI(resumeText, jobDescription);

        // Save analysis to Supabase database
        const token = req.headers.authorization?.split(" ")[1];
        if (token && (req as any).user) {
            const userSupabase = createAuthorizedClient(token);
            const { error: dbError } = await userSupabase
                .from('resume_analyses')
                .insert({
                    user_id: (req as any).user.id,
                    user_email: (req as any).user.email,
                    job_description: jobDescription,
                    analysis_data: analysis
                });
            
            if (dbError) {
                console.error("Failed to save analysis to database:", dbError);
            }
        }

        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error during analysis'
        });
    } finally {
        // Always delete the temporary file to keep the server disk clean
        if (file?.path) {
            try {
                await fs.unlink(file.path);
                console.log(`Cleaned up temporary file: ${file.path}`);
            } catch (err) {
                console.error("Failed to delete temporary file:", err);
            }
        }
    }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token || !(req as any).user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const userSupabase = createAuthorizedClient(token);
        const { data, error } = await userSupabase
            .from('resume_analyses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error fetching history'
        });
    }
};

export const getAnalysisById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token || !(req as any).user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const userSupabase = createAuthorizedClient(token);
        const { data, error } = await userSupabase
            .from('resume_analyses')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            res.status(404).json({ success: false, message: "Analysis not found" });
            return;
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Fetch analysis error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error fetching analysis'
        });
    }
};