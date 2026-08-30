import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());


app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ success: true, message: "SmartNotes API is running", timestamp: new Date() });
});


export default app;
