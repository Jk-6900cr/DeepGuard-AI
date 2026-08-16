const Prediction = require("../models/Prediction");
const { spawn } = require("child_process");
const path = require("path");
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const predictions = await Prediction.find({
      user: userId,
    });

    const totalScans = predictions.length;

    const imageScans = predictions.filter(
      (item) => item.fileType === "image"
    ).length;

    const videoScans = predictions.filter(
      (item) => item.fileType === "video"
    ).length;

    const authenticCount = predictions.filter(
      (item) => item.prediction === "Authentic"
    ).length;

    const aiGeneratedCount = predictions.filter(
      (item) =>
        item.prediction === "AI Generated" ||
        item.prediction === "AI-Generated"
    ).length;

    const averageConfidence =
      totalScans > 0
        ? predictions.reduce(
            (sum, item) => sum + item.confidence,
            0
          ) / totalScans
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalScans,
        imageScans,
        videoScans,
        authenticCount,
        aiGeneratedCount,
        averageConfidence: Number(averageConfidence.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
};

const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      predictions,
    });
  } catch (error) {
    console.error("Prediction History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load prediction history",
    });
  }
};

const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found",
      });
    }

    res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error("Get Prediction Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load prediction",
    });
  }
};

const analyzePrediction = async (req, res) => {
  try {
    // Check whether an image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const filePath = req.file.path;

    console.log("Analyzing image:", filePath);

    // Path to Python script
    const pythonScript = path.join(
      __dirname,
      "../python/predict.py"
    );

    // Start Python process
    const pythonProcess = spawn(
      "python",
      [pythonScript, filePath]
    );

    let output = "";
    let errorOutput = "";

    // Receive Python output
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Receive Python errors
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Python process finished
    pythonProcess.on("close", async (code) => {

      console.log("Python process exited with code:", code);

      if (code !== 0) {
        console.error("Python Error:", errorOutput);

        return res.status(500).json({
          success: false,
          message: "AI model prediction failed",
          error: errorOutput,
        });
      }

      try {
        // Convert Python JSON output into JavaScript object
        const result = JSON.parse(output.trim());

        // Convert model terminology to your existing UI terminology
        const prediction =
          result.prediction === "REAL"
            ? "Authentic"
            : "AI Generated";

        // Save prediction to MongoDB
        const predictionRecord = await Prediction.create({
          user: req.user.id,

          fileType: "image",

          filename: req.file.originalname,

          filepath: req.file.path,

          fileSize: req.file.size,

          prediction: prediction,

          confidence: result.confidence,

          risk: result.risk,

          summary: result.summary,
        });

        return res.status(200).json({
          success: true,

          prediction: predictionRecord,

          aiResult: result,
        });

      } catch (parseError) {

        console.error(
          "Prediction JSON Parse Error:",
          parseError
        );

        console.error(
          "Python Output:",
          output
        );

        return res.status(500).json({
          success: false,
          message: "Invalid response from AI model",
        });
      }
    });

  } catch (error) {

    console.error(
      "Analyze Prediction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze image",
    });
  }
};

const analyzeVideoPrediction = async (req, res) => {
  try {
    // Check whether a video was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded",
      });
    }

    const filePath = req.file.path;

    console.log("Analyzing video:", filePath);

    // Path to Python video prediction script
    const pythonScript = path.join(
      __dirname,
      "../python/predict_video.py"
    );

    // Start Python process
    const pythonProcess = spawn(
      "python",
      [pythonScript, filePath]
    );

    let output = "";
    let errorOutput = "";

    // Receive Python output
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Receive Python errors
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Python process finished
    pythonProcess.on("close", async (code) => {
      console.log(
        "Python video process exited with code:",
        code
      );

      if (code !== 0) {
        console.error(
          "Python Video Error:",
          errorOutput
        );

        return res.status(500).json({
          success: false,
          message: "AI video prediction failed",
          error: errorOutput,
        });
      }

      try {
        // Convert Python JSON output into JavaScript object
        const result = JSON.parse(output.trim());

        // Convert model terminology to existing UI terminology
        const prediction =
          result.prediction === "REAL"
            ? "Authentic"
            : "AI Generated";

        // Save prediction to MongoDB
        const predictionRecord = await Prediction.create({
          user: req.user.id,

          fileType: "video",

          filename: req.file.originalname,

          filepath: req.file.path,

          fileSize: req.file.size,

          prediction: prediction,

          confidence: result.confidence,

          risk: result.risk,

          summary: result.summary,
        });

        return res.status(200).json({
          success: true,

          prediction: predictionRecord,

          aiResult: result,
        });

      } catch (parseError) {
        console.error(
          "Video Prediction JSON Parse Error:",
          parseError
        );

        console.error(
          "Python Video Output:",
          output
        );

        return res.status(500).json({
          success: false,
          message: "Invalid response from video AI model",
        });
      }
    });

  } catch (error) {
    console.error(
      "Analyze Video Prediction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze video",
    });
  }
};

module.exports = {
  getDashboardStats,
  getPredictionHistory,
  getPredictionById,
  analyzePrediction,
  analyzeVideoPrediction,
};