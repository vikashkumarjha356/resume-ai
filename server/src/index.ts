import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes";
import { generalLimiter } from "./middleware/rateLimit.middleware";

const app = express();

// Trust proxy headers (e.g. X-Forwarded-For) for correct rate-limiting on Render
app.set('trust proxy', 1);

const isDev = process.env.BYPASS_AUTH_LIMITS === 'true';

app.use(cors({
    origin: isDev
        ? (origin, callback) => {
            // In development, allow any localhost origin (e.g. localhost:5173, localhost:5174, etc.)
            if (!origin || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
                callback(null, true);
            } else {
                callback(null, false);
            }
          }
        : (process.env.CLIENT_URL || "http://localhost:5173"),
    credentials: true
}));
app.use(express.json());
app.use(generalLimiter);

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});