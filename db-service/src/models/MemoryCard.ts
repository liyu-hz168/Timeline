import mongoose from "mongoose";

const MemoryCardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  memoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Memory",
    required: true,
  },
});

export default mongoose.model("MemoryCard", MemoryCardSchema);
