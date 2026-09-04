import { Router } from "express";
import {
    getAllNotes,
    getArchived,
    getTrashed,
    searchNotes,
    getById,
    createNote,
    updateNote,
    deleteNote,
    trashNote,
    restoreNote,
    pinNote,
    archiveNote,
    syncTags
} from "../controllers/note.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllNotes);
router.route("/").post(createNote);

router.route("/archived").get(getArchived);
router.route("/trash").get(getTrashed);
router.route("/search").get(searchNotes);

router.route("/:id").get(getById);
router.route("/:id").put(updateNote);
router.route("/:id").delete(deleteNote);

router.route("/:id/trash").patch(trashNote);
router.route("/:id/restore").patch(restoreNote);
router.route("/:id/pin").patch(pinNote);
router.route("/:id/archive").patch(archiveNote);

router.route("/:id/tags").patch(syncTags);

export default router;
