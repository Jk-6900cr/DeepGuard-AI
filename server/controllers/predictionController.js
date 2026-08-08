const Prediction = require("../models/Prediction");

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

module.exports = {
  getDashboardStats,
  getPredictionHistory,
  getPredictionById,
};