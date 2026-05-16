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

        // Initialize auth context
        const token = req.headers.authorization?.split(" ")[1];
        const user = (req as any).user;
        const userSupabase = (token && user) ? createAuthorizedClient(token) : null;

        // Check analysis limit (3 per 24 hours)
        if (userSupabase && user) {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            
            const { count, error: countError } = await userSupabase
                .from('resume_analyses')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .gte('created_at', twentyFourHoursAgo);

            if (countError) {
                console.error("Error checking analysis limit:", countError);
            } else if (count !== null && count >= 3) {
                res.status(403).json({
                    success: false,
                    message: "Daily limit reached. You can perform 3 analyses every 24 hours."
                });
                return;
            }
        }

        const resumeText = await parseResume(
            file.path,
            file.mimetype
        );

        // Call Gemini service (now handles parsing, validation, and retries)
        const analysis = await analyzeResumeWithAI(resumeText, jobDescription);

        // Save analysis to Supabase database
        if (userSupabase && user) {
            const { error: dbError } = await userSupabase
                .from('resume_analyses')
                .insert({
                    user_id: user.id,
                    user_email: user.email,
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