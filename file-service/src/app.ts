import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now()); 
  },
});

const allowedTypes = [
  "image/jpeg", "image/png","image/gif","image/webp","image/bmp", 
  "audio/mpeg","audio/ogg", "audio/wav", 
  "video/mp4", "video/webm","video/ogg", 
  "text/plain","text/html","text/markdown"
];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  limits: {
    // Max size 10 MB
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
});

// PUT: image storage, will later be stored in mounted docker volume 
app.put("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded...");
  }

  res.status(200).json({
    message: "File upload successful!",
    fileUrl: `http://localhost:4000/uploads/${req.file.filename}`,
  });
});

// GET: retrieve file by file name and memory it is associated with 
app.get("/api/files/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    // Send the file back to the client
    res.sendFile(filePath);
  });
});

// DELETE: delete file based on name and memory it is associated with
app.delete("/api/files/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    console.log("Attempting to delete:", filePath);
    if (err) {
      return res.status(404).send("File not found");
    }

    // Delete file
    promisify(fs.unlink)(filePath)
      .then(() => {
        res.status(200).json({
          message: "File deleted successfully!",
        });
      })
      .catch(() => {
        return res.status(500).send("Error deleting the file");
      });
  });
});

// Error handling 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).send("File is too large. Maximum size is 10MB.");
  }
  next(err);
});

app.use((err: Error, req: Request, res: Response) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "An unexpected error occurred." });
});

app.listen(4000, () => {
  console.log("File service running at http://localhost:4000");
});
