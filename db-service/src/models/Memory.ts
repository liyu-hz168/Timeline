import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "audio", "video"],
    required: true,
  },
  content: { type: String, required: true },
});

export default mongoose.model("Memory", MemorySchema);
