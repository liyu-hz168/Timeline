import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import memoryRoutes from "./routes/memory";
import editMemoryRoutes from "./routes/editMemory";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/editMemory", editMemoryRoutes);

app.get("/", (_req, res) => {
  res.send("Main Website Microservice is running.");
});

app.listen(PORT, () => {
  console.log(`Main website microservice running at http://localhost:${PORT}`);
});
