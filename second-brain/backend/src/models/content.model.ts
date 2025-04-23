import mongoose, { mongo } from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ContentModel = mongoose.model("Content", contentSchema);
