import { Note } from "../models/note.model.js";
import { Tag } from "../models/tag.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";


const createTag = asyncHandler(async (req, res) => {
    const { tagName, color } = req.body;

    if (!tagName) {
        throw new ApiError(400, "Tag name is required");
    }

    const tag = await Tag.create({
        user: req.user._id,
        tagName,
        color
    });

    return res.status(201).json(
        new ApiResponse(201, tag, "New Tag created")
    );
});

const getAllTags = asyncHandler(async (req, res) => {
    const tags = await Tag.find({
        user: req.user._id
    }).sort({ tagName: 1 }).lean();

    const counts = await Note.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id),
                isDeleted: false
            }
        },
        { $unwind: "$tags" },
        {
            $group: {
                _id: "$tags",
                count: { $sum: 1 }
            }
        }
    ]);

        // Convert counts to map for fast lookup
    const countMap = {};
    for (const c of counts) {
        countMap[c._id.toString()] = c.count;
    }

        // Merge tag + count
    const result = tags.map(tag => ({
        id: tag._id.toString(),
        tagName: tag.tagName,
        color: tag.color,
        noteCount: countMap[tag._id.toString()] || 0,
        createdAt: tag.createdAt
    }));

    return res.status(200).json(
        new ApiResponse(200, result, "Tags fetched successfully")
    );
});

const updateTag = asyncHandler(async (req, res) => {

});

const deleteTag = asyncHandler(async (req, res) => {

});


export { createTag, getAllTags, updateTag, deleteTag }

