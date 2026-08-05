require("dotenv").config();
const express = require("express");
const cors = require("cors");
const upload = require("./middleware/upload");
const uploadVideo = require("./middleware/uploadVideo");
const path = require("path");
const { spawn } = require("child_process");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DeepGuard AI Backend is Running 🚀");
});

app.get("/api/analyze/image", (req, res) => {
  // Temporary image path for testing
  const imagePath = path.join(__dirname, "uploads", "test.jpg");

  const python = spawn("python", [
    path.join(__dirname, "python", "predict.py"),
    imagePath,
  ]);

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  python.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({
        success: false,
        message: "Python script failed",
      });
    }

    try {
      res.json(JSON.parse(result));
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Invalid JSON returned by Python",
      });
    }
  });
});

app.post("/api/upload/image", upload, (req, res) => {
  try {
    console.log("Uploaded File:", req.file);

    const imagePath = req.file.path;

    const python = spawn("python", [
      path.join(__dirname, "python", "predict.py"),
      imagePath,
    ]);

    let result = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python Error:", data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({
          success: false,
          message: "Python script failed",
        });
      }

      try {
        const prediction = JSON.parse(result);

        res.status(200).json({
          success: true,
          filename: req.file.filename,
          filepath: req.file.path,
          prediction,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Invalid JSON returned by Python",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/upload/video", uploadVideo, (req, res) => {
  try {
    console.log("Uploaded Video:", req.file);

    const videoPath = req.file.path;

    const python = spawn("python", [
      path.join(__dirname, "python", "predict_video.py"),
      videoPath,
    ]);

    let result = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python Error:", data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({
          success: false,
          message: "Python script failed",
        });
      }

      try {
        const prediction = JSON.parse(result);

        res.status(200).json({
          success: true,
          filename: req.file.filename,
          filepath: req.file.path,
          prediction,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Invalid JSON returned by Python",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});