import { Router } from "express";
import { createTag, getAllTags, updateTag, deleteTag } from "../controllers/tag.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createTag);
router.route("/").get(getAllTags);
router.route("/:id").put(updateTag);
router.route("/:id").delete(deleteTag);

export default router;
