import { Router } from "express";
import userRouter from "./user.routes.js";
import noteRouter from "./note.routes.js";
import tagRouter from "./tag.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/notes", noteRouter);
router.use("/tags", tagRouter);

export default router;
