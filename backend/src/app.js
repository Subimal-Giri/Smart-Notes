import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { apiLimiter } from "./middlewares/rateLimiter.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.use(apiLimiter);

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ success: true, message: "SmartNotes API is running", timestamp: new Date() });
});

import indexRouters from "./routes/index.routes.js";
app.use("/api/v1", indexRouters);

// 404 for anything under /api/v1 that didn't match a route above
app.use("/api/v1", (req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorMiddleware);

export default app;
