import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes";
import { generalLimiter } from "./middleware/rateLimit.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(generalLimiter);

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});