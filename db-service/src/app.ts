import express from "express";
import mongoose from "mongoose";
import memoryRoutes from "./routes/memoryRoutes";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://mongodb:27017/memorydb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/database", memoryRoutes);

app.listen(5001, () => {
  console.log("DB Service running on port 5001");
});
