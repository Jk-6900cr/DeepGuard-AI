const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getPredictionHistory,
  getPredictionById,
  analyzePrediction,
} = require("../controllers/predictionController");

const router = express.Router();

// ==========================================
// Multer configuration
// Existing uploads folder
// ==========================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

// ==========================================
// Dashboard
// ==========================================

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardStats
);

// ==========================================
// Prediction history
// ==========================================

router.get(
  "/history",
  authMiddleware,
  getPredictionHistory
);

// ==========================================
// Analyze image
// ==========================================

router.post(
  "/analyze",
  authMiddleware,
  upload.single("image"),
  analyzePrediction
);

// ==========================================
// Get prediction by ID
// ==========================================

router.get(
  "/:id",
  authMiddleware,
  getPredictionById
);

module.exports = router;