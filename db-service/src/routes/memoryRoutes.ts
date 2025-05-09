import express from "express";
import Memory from "../models/Memory";
import MemoryCard from "../models/MemoryCard";

const router = express.Router();

// -------------------- ALL MEMORY STUFF -----------------------

// POST a new Memory
router.post("/memories", async (req, res) => {
  try {
    const memory = await Memory.create(req.body);
    res.status(201).json(memory);
  } catch (err) {
    res.status(400).json({ error: "Failed to create memory", details: err });
  }
});

// GET all Memories
router.get("/memories", async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch memories" });
  }
});

// GET Memory by ID
router.get("/memories/:id", async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) return res.status(404).json({ error: "Memory not found" });
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving memory" });
  }
});

// UPDATE/PUT a Memory
router.put("/memories/:id", async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!memory) return res.status(404).json({ error: "Memory not found" });
    res.status(200).json(memory);
  } catch (err) {
    res.status(400).json({ error: "Failed to update memory" });
  }
});

// DELETE a Memory
router.delete("/memories/:id", async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);
    if (!memory) return res.status(404).json({ error: "Memory not found" });
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: "Failed to delete memory" });
  }
});

// ---------------------------- MEMORY CARD STUFFF ----------------

// POST a new MemoryCard
router.post("/memory-cards", async (req, res) => {
  try {
    const card = await MemoryCard.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: "Failed to create memory card" });
  }
});

// GET all MemoryCards
router.get("/memory-cards", async (req, res) => {
  try {
    const cards = await MemoryCard.find().populate("memoryID");
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch memory cards" });
  }
});

// GET a specific MemoryCard
router.get("/memory-cards/:id", async (req, res) => {
  try {
    const card = await MemoryCard.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ error: "Memory card not found" });
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving memory card" });
  }
});

// UPDATE/PUT a MemoryCard
router.put("/memory-cards/:id", async (req, res) => {
  try {
    const card = await MemoryCard.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    if (!card) return res.status(404).json({ error: "Memory card not found" });
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ error: "Failed to update memory card" });
  }
});

// DELETE a MemoryCard
router.delete("/memory-cards/:id", async (req, res) => {
  try {
    const card = await MemoryCard.findOneAndDelete({ id: req.params.id });
    if (!card) return res.status(404).json({ error: "Memory card not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete memory card" });
  }
});

export default router;
