import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {

    },
    { timestamps: true }
)



export const Note = mongoose.model("Note", noteSchema)

