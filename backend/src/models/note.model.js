import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        title: {
            type: String,
            trim: true,
            default: "Untitled Note",
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        content: {
            type: String,
            default: ""
        },
        contentText: {
            type: String,
            default: "",
            select: false
        },
        isPinned: {
            type: Boolean,
            default: false
        },
        isArchived: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    },
    { timestamps: true }
)


noteSchema.index({ user: 1, isDeleted: 1, isArchived: 1 });
noteSchema.index({ user: 1, updatedAt: -1 });
noteSchema.index({ title: "text", content: "text" });

noteSchema.pre("save", function () {
    this.contentText = `${this.title} ${this.content}`;
});

noteSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};


export const Note = mongoose.model("Note", noteSchema)

