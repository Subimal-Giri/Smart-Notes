import { Tag } from "../models/tag.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


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
    
});

const updateTag = asyncHandler(async (req, res) => {

});

const deleteTag = asyncHandler(async (req, res) => {

});


export { createTag, getAllTags, updateTag, deleteTag }

