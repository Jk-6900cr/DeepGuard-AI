const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getPredictionHistory,
  getPredictionById
} = require("../controllers/predictionController");

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/history", authMiddleware, getPredictionHistory);
router.get("/:id", authMiddleware, getPredictionById);

module.exports = router;