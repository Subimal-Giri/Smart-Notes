import { Note } from "../models/note.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({
        user: req.user._id,
        isDeleted: false,
        isArchived: false
    })
        .populate("tags")
        .sort({ isPinned: -1, updatedAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notes, "All notes fetched")
    );
});

const getArchived = asyncHandler(async (req, res) => {
    
});

const getTrashed = asyncHandler(async (req, res) => {
    
});

const searchNotes = asyncHandler(async (req, res) => {
    
});

const getById = asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) {
        throw new ApiError(400, "Invalid note id");
    }

    const note = await Note.findOne({
        _id: req.params.id,
        user: req.user._id
    }).populate("tags");

    if (!note) {
        throw new ApiError(404, "Note not found");
    }
    return res.status(200).json(
        new ApiResponse(200, note, "Note fetched")
    );
});

const createNote = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;

    const note = await Note.create({
        user: req.user._id,
        title,
        content,
        tags
    });

    await note.populate("tags");

    return res.status(201).json(
        new ApiResponse(201, note, "Note created")
    );
});

const updateNote = asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) {
        throw new ApiError(400, "Invalid note id");
    }

    const { title, content, tags } = req.body;
    const updates = {};

    if (title !== undefined) {
        updates.title = title;
    }
    if (content !== undefined) {
        updates.content = content;
    }
    if (tags !== undefined) {
        updates.tags = tags;
    }

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No fields provided to update");
    }

    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    ).populate("tags");

    if (!note) {
        throw new ApiError(404, "Note not found");
    }
    return res.status(200).json(
        new ApiResponse(200, note, "Note updated successfully")
    );
});

const deleteNote = asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) {
        throw new ApiError(400, "Invalid note id");
    }

    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Note deleted permanently")
    );
});

const trashNote = asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) {
        throw new ApiError(400, "Invalid note id");
    }

    const note = await Note.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id
        },
        {
            isDeleted: true,
            deletedAt: new Date(),
            isPinned: false
        },
        { new: true }
    ).populate("tags");

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Moved to trash")
    );
});

const restoreNote = asyncHandler(async (req, res) => {

});

const pinNote = asyncHandler(async (req, res) => {

});

const archiveNote = asyncHandler(async (req, res) => {

});

const syncTags = asyncHandler(async (req, res) => {

});

export {
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
}

