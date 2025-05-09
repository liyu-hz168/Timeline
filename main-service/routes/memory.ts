import express from "express";
import axios from "axios";
const router = express.Router();

const DB_BASE = "http://localhost:5001"; // replace with Leon’s service

router.get("/view", async (req, res) => {
  const { mode, start } = req.query;
  const response = await axios.get(`${DB_BASE}/memory/view`, { params: { mode, start } });
  res.json(response.data);
});

router.get("/:date", async (req, res) => {
  const { date } = req.params;
  const response = await axios.get(`${DB_BASE}/memory/${date}`);
  res.json(response.data);
});

router.post("/", async (req, res) => {
  const response = await axios.post(`${DB_BASE}/memory`, req.body);
  res.json(response.data);
});

router.put("/:id", async (req, res) => {
  const response = await axios.put(`${DB_BASE}/memory/${req.params.id}`, req.body);
  res.json(response.data);
});

router.delete("/:id", async (req, res) => {
  const response = await axios.delete(`${DB_BASE}/memory/${req.params.id}`);
  res.json(response.data);
});

export default router;
