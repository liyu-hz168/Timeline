import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ user: { email }, token: "fake-jwt-token" });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  res.json({ user: { email }, token: "fake-jwt-token" });
});

export default router;