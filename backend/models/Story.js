import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Story = mongoose.model("Story", storySchema);
