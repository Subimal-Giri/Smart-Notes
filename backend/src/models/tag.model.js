import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        tagName: {
            type: String,
            required: true,
            trim: true
        },
        color: {
            type: String,
            default: "#3B82F6"
        }
    },
    { timestamps: true }
)

tagSchema.index({ user: 1, tagName: 1 }, { unique: true });

tagSchema.methods.toJSON = function () {
    const obj = this.toObject({ virtuals: true });

    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    return obj;
};


export const Tag = mongoose.model("Tag", tagSchema)

