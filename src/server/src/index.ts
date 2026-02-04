import express from "express";
const app = express();
const port = 3001;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
