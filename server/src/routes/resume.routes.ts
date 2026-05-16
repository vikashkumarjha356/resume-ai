import express from "express";
import multer from "multer";
import { analyzeResume, getHistory, getAnalysisById } from "../controllers/resume.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { analysisLimiter } from "../middleware/rateLimit.middleware";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/analyze",
    requireAuth,
    analysisLimiter,
    upload.single("resume"),
    analyzeResume
);

router.get(
    "/history",
    requireAuth,
    getHistory
);

router.get(
    "/analysis/:id",
    requireAuth,
    getAnalysisById
);

export default router;